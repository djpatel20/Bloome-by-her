import { Router } from 'express'
import * as homepageController from '../controllers/homepage.controller.js'

const router = Router()

router.get('/instagram-gallery', homepageController.getInstagramGallery)
router.get('/banners', homepageController.getBanners)

export default router
