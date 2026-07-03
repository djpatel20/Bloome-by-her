import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { Order } from '../models/Order.model.js'
import { Product } from '../models/Product.model.js'
import { parsePagination, buildPaginatedResult } from '../utils/pagination.js'

const SHIPPING_FLAT_RATE = 40

async function generateOrderNumber() {
  const count = await Order.countDocuments()
  return `ORD-${String(count + 1).padStart(6, '0')}`
}

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body

  const products = await Product.find({ _id: { $in: items.map((item) => item.productId) } })
  const productById = new Map(products.map((product) => [product.id, product]))

  const orderItems = []
  for (const { productId, quantity } of items) {
    const product = productById.get(productId)
    if (!product) {
      throw ApiError.badRequest(`Product ${productId} not found`)
    }
    if (product.stock < quantity) {
      throw ApiError.badRequest(`Not enough stock for ${product.name}`)
    }
    orderItems.push({
      productId: product._id,
      productName: product.name,
      productImage: product.images[0]?.url ?? '',
      price: product.price,
      quantity,
    })
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = SHIPPING_FLAT_RATE
  const total = subtotal + shipping

  const order = await Order.create({
    orderNumber: await generateOrderNumber(),
    customer: req.user.id,
    customerName: req.user.name,
    items: orderItems,
    subtotal,
    shipping,
    total,
    status: 'pending',
    paymentMethod,
    shippingAddress,
  })

  await Promise.all(
    orderItems.map((item) =>
      Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity, salesCount: item.quantity },
      }),
    ),
  )

  res.status(201).json(order)
})

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user.id }).sort({ createdAt: -1 })
  res.json(orders)
})

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (!order) {
    throw ApiError.notFound('Order not found')
  }
  if (order.customer.toString() !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('You cannot view this order')
  }
  res.json(order)
})

export const adminListOrders = asyncHandler(async (req, res) => {
  const { page, pageSize, skip } = parsePagination(req.query)
  const [items, total] = await Promise.all([
    Order.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize),
    Order.countDocuments(),
  ])
  res.json(buildPaginatedResult(items, total, page, pageSize))
})

export const adminUpdateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  )
  if (!order) {
    throw ApiError.notFound('Order not found')
  }
  res.json(order)
})
