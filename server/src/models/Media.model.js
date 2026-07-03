import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    fileName: { type: String, required: true },
    storageRef: { type: String, required: true },
  },
  { timestamps: { createdAt: 'uploadedAt', updatedAt: false } },
)

mediaSchema.plugin(toJSONPlugin)

export const Media = mongoose.model('Media', mediaSchema)
