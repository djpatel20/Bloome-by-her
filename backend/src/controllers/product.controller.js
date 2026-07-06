import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { Product } from '../models/Product.model.js'
import { Category } from '../models/Category.model.js'
import { parsePagination, buildPaginatedResult } from '../utils/pagination.js'

const SORT_MAP = {
  newest: { createdAt: -1 },
  'price-asc': { price: 1 },
  'price-desc': { price: -1 },
  rating: { rating: -1 },
  'best-selling': { salesCount: -1 },
}

function buildFilter(query) {
  const filter = {}

  if (query.categoryIds) {
    const ids = Array.isArray(query.categoryIds) ? query.categoryIds : [query.categoryIds]
    filter.category = { $in: ids }
  }
  if (query.minPrice || query.maxPrice) {
    filter.price = {}
    if (query.minPrice) filter.price.$gte = Number(query.minPrice)
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice)
  }
  if (query.minRating) {
    filter.rating = { $gte: Number(query.minRating) }
  }
  if (query.search) {
    filter.$text = { $search: query.search }
  }

  return filter
}

export const listProducts = asyncHandler(async (req, res) => {
  const filter = buildFilter(req.query)
  const { page, pageSize, skip } = parsePagination(req.query)
  const sort = SORT_MAP[req.query.sort] ?? SORT_MAP.newest

  const [items, total] = await Promise.all([
    Product.find(filter).populate('category').sort(sort).skip(skip).limit(pageSize),
    Product.countDocuments(filter),
  ])

  res.json(buildPaginatedResult(items, total, page, pageSize))
})

export const getBestSellers = asyncHandler(async (_req, res) => {
  const products = await Product.find({ isBestSeller: true })
    .populate('category')
    .sort({ salesCount: -1 })
    .limit(8)
  res.json(products)
})

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category')
  if (!product) {
    throw ApiError.notFound('Product not found')
  }
  res.json(product)
})

export async function resolveCategoryOrThrow(categoryId) {
  const category = await Category.findById(categoryId)
  if (!category) {
    throw ApiError.badRequest('Category not found')
  }
  return category
}
