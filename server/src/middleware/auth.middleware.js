import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { verifyAccessToken } from '../utils/tokens.js'
import { User } from '../models/User.model.js'

export const requireAuth = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization
  const token = req.cookies?.accessToken ?? (header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null)
  if (!token) {
    throw ApiError.unauthorized('Missing access token')
  }

  let payload
  try {
    payload = verifyAccessToken(token)
  } catch {
    throw ApiError.unauthorized('Invalid or expired token')
  }

  const user = await User.findById(payload.sub)
  if (!user) {
    throw ApiError.unauthorized('User no longer exists')
  }

  req.user = user
  next()
})
