import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'

const productImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: '' },
  },
  { _id: true },
)

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number, min: 0 },
    images: { type: [productImageSchema], default: [] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, default: 0, min: 0 },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    salesCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

productSchema.index({ name: 'text', description: 'text' })
productSchema.plugin(toJSONPlugin)

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    ret.images = (ret.images ?? []).map((image) => ({
      id: image._id?.toString() ?? image.id,
      url: image.url,
      alt: image.alt,
    }))
    if (ret.category && typeof ret.category === 'object' && ret.category.name) {
      ret.categoryId = ret.category._id?.toString() ?? ret.category.id
      ret.categoryName = ret.category.name
      ret.category = undefined
    } else {
      ret.categoryId = ret.category?.toString()
      ret.category = undefined
    }
    return ret
  },
})

export const Product = mongoose.model('Product', productSchema)
