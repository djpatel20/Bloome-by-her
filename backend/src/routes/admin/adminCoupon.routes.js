import { Router } from 'express'
import * as adminCouponController from '../../controllers/admin/adminCoupon.controller.js'
import { validateBody } from '../../middleware/validate.middleware.js'
import { createCouponSchema, updateCouponSchema } from '../../validators/coupon.validator.js'

const router = Router()

router.get('/', adminCouponController.adminListCoupons)
router.post('/', validateBody(createCouponSchema), adminCouponController.adminCreateCoupon)
router.patch('/:id', validateBody(updateCouponSchema), adminCouponController.adminUpdateCoupon)
router.delete('/:id', adminCouponController.adminDeleteCoupon)

export default router
