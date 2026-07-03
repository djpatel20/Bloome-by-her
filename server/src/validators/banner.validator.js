import { z } from 'zod'

export const createBannerSchema = z.object({
  title: z.string().min(2),
  imageUrl: z.string().url(),
  linkUrl: z.string().url().optional().or(z.literal('')),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
})

export const updateBannerSchema = createBannerSchema.partial()
