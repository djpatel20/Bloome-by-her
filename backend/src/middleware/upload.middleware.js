import multer from 'multer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const UPLOADS_DIR = path.join(__dirname, '../../uploads')

function imageFileFilter(_req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    cb(new Error('Only image uploads are allowed'))
    return
  }
  cb(null, true)
}

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})
