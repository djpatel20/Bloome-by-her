import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercent: { type: Number, required: true, min: 1, max: 100 },
    isActive: { type: Boolean, default: true },
    expiresAt: Date,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

couponSchema.plugin(toJSONPlugin)

export const Coupon = mongoose.model('Coupon', couponSchema)
