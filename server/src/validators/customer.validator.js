import { z } from 'zod'

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
})

export const saveAddressSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(2),
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(4),
  phone: z.string().min(10),
  isDefault: z.boolean().optional(),
})
