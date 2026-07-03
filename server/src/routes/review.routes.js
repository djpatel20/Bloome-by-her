import { Router } from 'express'
import * as reviewController from '../controllers/review.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { validateBody } from '../middleware/validate.middleware.js'
import { createReviewSchema } from '../validators/review.validator.js'

const router = Router()

router.get('/featured', reviewController.listFeatured)
router.post('/', requireAuth, validateBody(createReviewSchema), reviewController.createReview)

export default router
