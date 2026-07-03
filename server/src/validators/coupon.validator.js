import { z } from 'zod'

export const createCouponSchema = z.object({
  code: z.string().min(3),
  discountPercent: z.number().min(1).max(100),
  isActive: z.boolean().optional(),
  expiresAt: z.string().optional(),
})

export const updateCouponSchema = createCouponSchema.partial()
