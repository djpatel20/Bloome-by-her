import { Router } from 'express'
import authRoutes from './auth.routes.js'
import productRoutes from './product.routes.js'
import categoryRoutes from './category.routes.js'
import orderRoutes from './order.routes.js'
import reviewRoutes from './review.routes.js'
import customerRoutes from './customer.routes.js'
import homepageRoutes from './homepage.routes.js'
import adminRoutes from './admin/index.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/orders', orderRoutes)
router.use('/reviews', reviewRoutes)
router.use('/customers', customerRoutes)
router.use('/homepage', homepageRoutes)
router.use('/admin', adminRoutes)

export default router
