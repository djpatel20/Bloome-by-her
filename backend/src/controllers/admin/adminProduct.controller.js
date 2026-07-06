import { asyncHandler } from '../../utils/asyncHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { Product } from '../../models/Product.model.js'
import { parsePagination, buildPaginatedResult } from '../../utils/pagination.js'
import { slugify } from '../../utils/slugify.js'

export const adminListProducts = asyncHandler(async (req, res) => {
  const { page, pageSize, skip } = parsePagination(req.query, 20)
  const [items, total] = await Promise.all([
    Product.find().populate('category').sort({ createdAt: -1 }).skip(skip).limit(pageSize),
    Product.countDocuments(),
  ])
  res.json(buildPaginatedResult(items, total, page, pageSize))
})

export const adminCreateProduct = asyncHandler(async (req, res) => {
  const { categoryId, ...rest } = req.body
  const slugBase = slugify(rest.name)
  const existingCount = await Product.countDocuments({ slug: new RegExp(`^${slugBase}`) })
  const slug = existingCount ? `${slugBase}-${existingCount + 1}` : slugBase

  const product = await Product.create({ ...rest, category: categoryId, slug })
  await product.populate('category')
  res.status(201).json(product)
})

export const adminUpdateProduct = asyncHandler(async (req, res) => {
  const { categoryId, ...rest } = req.body
  const update = categoryId ? { ...rest, category: categoryId } : rest

  const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true }).populate(
    'category',
  )
  if (!product) {
    throw ApiError.notFound('Product not found')
  }
  res.json(product)
})

export const adminDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    throw ApiError.notFound('Product not found')
  }
  res.status(204).send()
})
