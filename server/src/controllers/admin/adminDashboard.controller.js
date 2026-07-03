import { asyncHandler } from '../../utils/asyncHandler.js'
import { Product } from '../../models/Product.model.js'
import { Order } from '../../models/Order.model.js'
import { User } from '../../models/User.model.js'

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [totalProducts, totalOrders, totalCustomers, revenueResult] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]),
  ])

  res.json({
    totalProducts,
    totalOrders,
    totalCustomers,
    totalRevenue: revenueResult[0]?.total ?? 0,
  })
})

export const getSalesOverview = asyncHandler(async (_req, res) => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const results = await Order.aggregate([
    { $match: { status: { $ne: 'cancelled' }, createdAt: { $gte: startOfMonth } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        value: { $sum: '$total' },
      },
    },
    { $sort: { _id: 1 } },
  ])

  const points = results.map((entry) => ({
    label: new Date(entry._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: entry.value,
  }))

  res.json(points)
})

export const getOrderStatusBreakdown = asyncHandler(async (_req, res) => {
  const results = await Order.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  res.json(results.map((entry) => ({ status: entry._id, count: entry.count })))
})

export const getTopProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find()
    .populate('category')
    .sort({ salesCount: -1 })
    .limit(5)
  res.json(products)
})
