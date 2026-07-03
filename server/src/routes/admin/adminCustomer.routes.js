import { Router } from 'express'
import * as customerController from '../../controllers/customer.controller.js'

const router = Router()

router.get('/', customerController.adminListCustomers)

export default router
