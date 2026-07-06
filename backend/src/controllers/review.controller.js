import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { Review } from '../models/Review.model.js'
import { Product } from '../models/Product.model.js'

export async function recomputeProductRating(productId) {
  const stats = await Review.aggregate([
    { $match: { product: productId, isApproved: true } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ])

  const { avgRating = 0, count = 0 } = stats[0] ?? {}
  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(avgRating * 10) / 10,
    reviewCount: count,
  })
}

export const listByProduct = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
    isApproved: true,
  }).sort({ createdAt: -1 })
  res.json(reviews)
})

export const listFeatured = asyncHandler(async (_req, res) => {
  const reviews = await Review.find({ isApproved: true })
    .sort({ rating: -1, createdAt: -1 })
    .limit(6)
  res.json(reviews)
})

export const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment } = req.body

  const product = await Product.findById(productId)
  if (!product) {
    throw ApiError.badRequest('Product not found')
  }

  const review = await Review.create({
    product: productId,
    customer: req.user.id,
    customerName: req.user.name,
    customerAvatarUrl: req.user.avatarUrl,
    rating,
    title,
    comment,
  })

  res.status(201).json(review)
})
