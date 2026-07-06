import { Router } from 'express'
import * as adminBannerController from '../../controllers/admin/adminBanner.controller.js'
import { validateBody } from '../../middleware/validate.middleware.js'
import { createBannerSchema, updateBannerSchema } from '../../validators/banner.validator.js'

const router = Router()

router.get('/', adminBannerController.adminListBanners)
router.post('/', validateBody(createBannerSchema), adminBannerController.adminCreateBanner)
router.patch('/:id', validateBody(updateBannerSchema), adminBannerController.adminUpdateBanner)
router.delete('/:id', adminBannerController.adminDeleteBanner)

export default router
