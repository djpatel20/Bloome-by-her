import { z } from 'zod'

export const createReviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(3).max(80),
  comment: z.string().min(10).max(1000),
})

export const setReviewApprovalSchema = z.object({
  isApproved: z.boolean(),
})
