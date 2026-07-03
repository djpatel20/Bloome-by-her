import { Router } from 'express'
import * as adminDashboardController from '../../controllers/admin/adminDashboard.controller.js'

const router = Router()

router.get('/stats', adminDashboardController.getDashboardStats)
router.get('/sales-overview', adminDashboardController.getSalesOverview)
router.get('/order-status', adminDashboardController.getOrderStatusBreakdown)
router.get('/top-products', adminDashboardController.getTopProducts)

export default router
