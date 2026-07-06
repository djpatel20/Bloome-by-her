import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    customerAvatarUrl: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

reviewSchema.plugin(toJSONPlugin)

reviewSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    ret.productId = ret.product?.toString()
    ret.customerId = ret.customer?.toString()
    ret.product = undefined
    ret.customer = undefined
    return ret
  },
})

export const Review = mongoose.model('Review', reviewSchema)
