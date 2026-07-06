import { asyncHandler } from '../utils/asyncHandler.js'
import { GalleryImage } from '../models/GalleryImage.model.js'

export const getInstagramGallery = asyncHandler(async (_req, res) => {
  const images = await GalleryImage.find().sort({ sortOrder: 1, createdAt: -1 })
  res.json(images)
})
