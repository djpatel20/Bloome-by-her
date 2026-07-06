import { Router } from 'express'
import * as homepageController from '../controllers/homepage.controller.js'

const router = Router()

router.get('/instagram-gallery', homepageController.getInstagramGallery)

export default router
