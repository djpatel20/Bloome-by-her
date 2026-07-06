import { z } from 'zod'

const addressSchema = z.object({
  fullName: z.string().min(2),
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(4),
  phone: z.string().min(10),
  isDefault: z.boolean().optional(),
})

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1),
      }),
    )
    .min(1, 'Order must contain at least one item'),
  shippingAddress: addressSchema,
  paymentMethod: z.enum(['cod', 'upi', 'card', 'netbanking']),
})

export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
})
