import { Router } from 'express'
import * as orderController from '../../controllers/order.controller.js'
import { validateBody } from '../../middleware/validate.middleware.js'
import { updateOrderStatusSchema } from '../../validators/order.validator.js'

const router = Router()

router.get('/', orderController.adminListOrders)
router.patch(
  '/:id/status',
  validateBody(updateOrderStatusSchema),
  orderController.adminUpdateOrderStatus,
)

export default router
