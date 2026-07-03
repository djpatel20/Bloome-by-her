import { Router } from 'express'
import * as orderController from '../controllers/order.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { validateBody } from '../middleware/validate.middleware.js'
import { createOrderSchema } from '../validators/order.validator.js'

const router = Router()

router.use(requireAuth)
router.get('/mine', orderController.getMyOrders)
router.get('/:id', orderController.getOrderById)
router.post('/', validateBody(createOrderSchema), orderController.createOrder)

export default router
