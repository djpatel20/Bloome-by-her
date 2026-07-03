import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'
import { addressSchema } from './Address.schema.js'

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productImage: { type: String, default: '' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    customerName: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: { type: String, enum: ['cod', 'upi', 'card', 'netbanking'], required: true },
    shippingAddress: { type: addressSchema, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

orderSchema.plugin(toJSONPlugin)

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    ret.customerId = ret.customer?.toString()
    ret.customer = undefined
    ret.items = (ret.items ?? []).map((item) => ({
      productId: item.productId?.toString(),
      productName: item.productName,
      productImage: item.productImage,
      price: item.price,
      quantity: item.quantity,
    }))
    if (ret.shippingAddress) {
      ret.shippingAddress = {
        ...ret.shippingAddress,
        id: ret.shippingAddress._id?.toString() ?? ret.shippingAddress.id,
        _id: undefined,
      }
    }
    return ret
  },
})

export const Order = mongoose.model('Order', orderSchema)
