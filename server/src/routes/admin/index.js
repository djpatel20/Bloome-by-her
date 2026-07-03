import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.middleware.js'
import { requireAdmin } from '../../middleware/requireAdmin.middleware.js'
import productRoutes from './adminProduct.routes.js'
import categoryRoutes from './adminCategory.routes.js'
import orderRoutes from './adminOrder.routes.js'
import customerRoutes from './adminCustomer.routes.js'
import reviewRoutes from './adminReview.routes.js'
import bannerRoutes from './adminBanner.routes.js'
import couponRoutes from './adminCoupon.routes.js'
import mediaRoutes from './adminMedia.routes.js'
import dashboardRoutes from './adminDashboard.routes.js'

const router = Router()

router.use(requireAuth, requireAdmin)

router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/orders', orderRoutes)
router.use('/customers', customerRoutes)
router.use('/reviews', reviewRoutes)
router.use('/banners', bannerRoutes)
router.use('/coupons', couponRoutes)
router.use('/media', mediaRoutes)
router.use('/dashboard', dashboardRoutes)

export default router
