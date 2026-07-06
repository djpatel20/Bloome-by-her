import { Router } from 'express'
import * as adminMediaController from '../../controllers/admin/adminMedia.controller.js'
import { upload } from '../../middleware/upload.middleware.js'

const router = Router()

router.get('/', adminMediaController.adminListMedia)
router.post('/', upload.single('file'), adminMediaController.adminUploadMedia)
router.delete('/:id', adminMediaController.adminDeleteMedia)

export default router
