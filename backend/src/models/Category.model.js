import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

categorySchema.plugin(toJSONPlugin)

export const Category = mongoose.model('Category', categorySchema)
