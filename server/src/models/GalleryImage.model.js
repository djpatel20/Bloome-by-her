import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'

const galleryImageSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    postUrl: String,
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

galleryImageSchema.plugin(toJSONPlugin)

export const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema)
