import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { ApiError } from '../../utils/ApiError.js'
import { Media } from '../../models/Media.model.js'
import { UPLOADS_DIR } from '../../middleware/upload.middleware.js'
import { isCloudinaryConfigured } from '../../config/env.js'
import { cloudinary, uploadBufferToCloudinary } from '../../config/cloudinary.js'

export const adminListMedia = asyncHandler(async (_req, res) => {
  const media = await Media.find().sort({ uploadedAt: -1 })
  res.json(media)
})

export const adminUploadMedia = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('No file uploaded')
  }

  let url
  let storageRef

  if (isCloudinaryConfigured) {
    const result = await uploadBufferToCloudinary(req.file.buffer)
    url = result.secure_url
    storageRef = result.public_id
  } else {
    const ext = path.extname(req.file.originalname)
    const fileName = `${randomUUID()}${ext}`
    await fs.mkdir(UPLOADS_DIR, { recursive: true })
    await fs.writeFile(path.join(UPLOADS_DIR, fileName), req.file.buffer)
    url = `${req.protocol}://${req.get('host')}/uploads/${fileName}`
    storageRef = fileName
  }

  const media = await Media.create({ url, fileName: req.file.originalname, storageRef })
  res.status(201).json(media)
})

export const adminDeleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findByIdAndDelete(req.params.id)
  if (!media) {
    throw ApiError.notFound('Media not found')
  }

  if (isCloudinaryConfigured && media.storageRef) {
    await cloudinary.uploader.destroy(media.storageRef).catch(() => {})
  } else if (media.storageRef) {
    await fs.unlink(path.join(UPLOADS_DIR, media.storageRef)).catch(() => {})
  }

  res.status(204).send()
})
