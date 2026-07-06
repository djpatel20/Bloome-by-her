import mongoose from 'mongoose'
import { toJSONPlugin } from '../utils/toJSONPlugin.js'
import { addressSchema } from './Address.schema.js'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    phone: String,
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    avatarUrl: String,
    addresses: { type: [addressSchema], default: [] },
    refreshTokenHash: { type: String, default: null },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

userSchema.plugin(toJSONPlugin)

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.passwordHash
    delete ret.refreshTokenHash
    if (Array.isArray(ret.addresses)) {
      ret.addresses = ret.addresses.map((address) => ({
        ...address,
        id: address._id?.toString() ?? address.id,
        _id: undefined,
      }))
    }
    return ret
  },
})

export const User = mongoose.model('User', userSchema)
