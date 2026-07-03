import { z } from 'zod'

const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional().default(''),
})

export const createProductSchema = z.object({
  name: z.string().min(2),
  categoryId: z.string().min(1),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().optional(),
  stock: z.number().min(0),
  description: z.string().min(10),
  images: z.array(imageSchema).min(1),
  tags: z.array(z.string()).optional(),
  isBestSeller: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

export const updateProductSchema = createProductSchema.partial()
