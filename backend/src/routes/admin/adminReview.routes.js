import { Router } from 'express'
import * as adminReviewController from '../../controllers/admin/adminReview.controller.js'
import { validateBody } from '../../middleware/validate.middleware.js'
import { setReviewApprovalSchema } from '../../validators/review.validator.js'

const router = Router()

router.get('/', adminReviewController.adminListReviews)
router.patch(
  '/:id',
  validateBody(setReviewApprovalSchema),
  adminReviewController.adminSetReviewApproval,
)

export default router
