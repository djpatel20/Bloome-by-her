import { v2 as cloudinary } from 'cloudinary'
import { randomUUID } from 'node:crypto'
import { env, isCloudinaryConfigured } from './env.js'

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  })
}

export function uploadBufferToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'bloome-by-her', public_id: randomUUID() },
      (error, result) => {
        if (error) {
          reject(error)
          return
        }
        resolve(result)
      },
    )
    stream.end(buffer)
  })
}

export { cloudinary }
