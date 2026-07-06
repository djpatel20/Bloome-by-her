import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    linkUrl: String,
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

bannerSchema.plugin(toJSONPlugin)

export const Banner = mongoose.model('Banner', bannerSchema)
