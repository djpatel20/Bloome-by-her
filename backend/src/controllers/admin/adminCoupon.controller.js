import { asyncHandler } from '../../utils/asyncHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { Coupon } from '../../models/Coupon.model.js'

export const adminListCoupons = asyncHandler(async (_req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 })
  res.json(coupons)
})

export const adminCreateCoupon = asyncHandler(async (req, res) => {
  const existing = await Coupon.findOne({ code: req.body.code.toUpperCase() })
  if (existing) {
    throw ApiError.conflict('A coupon with this code already exists')
  }
  const coupon = await Coupon.create(req.body)
  res.status(201).json(coupon)
})

export const adminUpdateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!coupon) {
    throw ApiError.notFound('Coupon not found')
  }
  res.json(coupon)
})

export const adminDeleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id)
  if (!coupon) {
    throw ApiError.notFound('Coupon not found')
  }
  res.status(204).send()
})
