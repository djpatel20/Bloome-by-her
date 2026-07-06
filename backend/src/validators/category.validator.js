import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().url(),
})

export const updateCategorySchema = createCategorySchema.partial()
