import { asyncHandler } from '../../utils/asyncHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { Banner } from '../../models/Banner.model.js'

export const adminListBanners = asyncHandler(async (_req, res) => {
  const banners = await Banner.find().sort({ sortOrder: 1, createdAt: -1 })
  res.json(banners)
})

export const adminCreateBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.create(req.body)
  res.status(201).json(banner)
})

export const adminUpdateBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!banner) {
    throw ApiError.notFound('Banner not found')
  }
  res.json(banner)
})

export const adminDeleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findByIdAndDelete(req.params.id)
  if (!banner) {
    throw ApiError.notFound('Banner not found')
  }
  res.status(204).send()
})
