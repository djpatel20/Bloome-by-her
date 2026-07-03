import { Router } from 'express'
import * as adminCategoryController from '../../controllers/admin/adminCategory.controller.js'
import * as categoryController from '../../controllers/category.controller.js'
import { validateBody } from '../../middleware/validate.middleware.js'
import { createCategorySchema, updateCategorySchema } from '../../validators/category.validator.js'

const router = Router()

router.get('/', categoryController.listCategories)
router.post('/', validateBody(createCategorySchema), adminCategoryController.adminCreateCategory)
router.patch(
  '/:id',
  validateBody(updateCategorySchema),
  adminCategoryController.adminUpdateCategory,
)
router.delete('/:id', adminCategoryController.adminDeleteCategory)

export default router
