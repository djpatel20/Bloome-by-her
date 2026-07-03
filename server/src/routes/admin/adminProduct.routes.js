import { Router } from 'express'
import * as adminProductController from '../../controllers/admin/adminProduct.controller.js'
import { validateBody } from '../../middleware/validate.middleware.js'
import { createProductSchema, updateProductSchema } from '../../validators/product.validator.js'

const router = Router()

router.get('/', adminProductController.adminListProducts)
router.post('/', validateBody(createProductSchema), adminProductController.adminCreateProduct)
router.patch('/:id', validateBody(updateProductSchema), adminProductController.adminUpdateProduct)
router.delete('/:id', adminProductController.adminDeleteProduct)

export default router
