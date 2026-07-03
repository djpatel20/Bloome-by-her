import { asyncHandler } from '../../utils/asyncHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { Review } from '../../models/Review.model.js'
import { parsePagination, buildPaginatedResult } from '../../utils/pagination.js'
import { recomputeProductRating } from '../review.controller.js'

export const adminListReviews = asyncHandler(async (req, res) => {
  const { page, pageSize, skip } = parsePagination(req.query, 20)
  const [items, total] = await Promise.all([
    Review.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize),
    Review.countDocuments(),
  ])
  res.json(buildPaginatedResult(items, total, page, pageSize))
})

export const adminSetReviewApproval = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { isApproved: req.body.isApproved },
    { new: true },
  )
  if (!review) {
    throw ApiError.notFound('Review not found')
  }

  await recomputeProductRating(review.product)
  res.json(review)
})
