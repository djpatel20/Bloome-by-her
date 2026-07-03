import { Router } from 'express'
import * as customerController from '../controllers/customer.controller.js'
import { requireAuth } from '../middleware/auth.middleware.js'
import { validateBody } from '../middleware/validate.middleware.js'
import { updateProfileSchema, saveAddressSchema } from '../validators/customer.validator.js'

const router = Router()

router.use(requireAuth)
router.patch('/me', validateBody(updateProfileSchema), customerController.updateProfile)
router.get('/me/addresses', customerController.listAddresses)
router.post('/me/addresses', validateBody(saveAddressSchema), customerController.saveAddress)

export default router
