import { Router } from 'express'
import * as productController from '../controllers/product.controller.js'
import * as reviewController from '../controllers/review.controller.js'

const router = Router()

router.get('/best-sellers', productController.getBestSellers)
router.get('/:slug', productController.getProductBySlug)
router.get('/:productId/reviews', reviewController.listByProduct)
router.get('/', productController.listProducts)

export default router
