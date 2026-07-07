import bcrypt from 'bcryptjs'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/User.model.js'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  accessCookieOptions,
  refreshCookieOptions,
  clearAccessCookieOptions,
  clearRefreshCookieOptions,
} from '../utils/tokens.js'

async function issueSession(req, res, user) {
  const accessToken = signAccessToken(user)
  const refreshToken = signRefreshToken(user)
  user.refreshTokenHash = await bcrypt.hash(refreshToken, 10)
  await user.save()
  res.cookie('accessToken', accessToken, accessCookieOptions(req))
  res.cookie('refreshToken', refreshToken, refreshCookieOptions(req))
  return accessToken
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const existing = await User.findOne({ email })
  if (existing) {
    throw ApiError.conflict('An account with this email already exists')
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash, role: 'customer' })

  await issueSession(req, res, user)
  res.status(201).json({ user })
})

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw ApiError.unauthorized('Invalid email or password')
  }

  await issueSession(req, res, user)
  res.json({ user })
})

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken
  if (!token) {
    throw ApiError.unauthorized('Missing refresh token')
  }

  let payload
  try {
    payload = verifyRefreshToken(token)
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token')
  }

  const user = await User.findById(payload.sub)
  if (!user?.refreshTokenHash || !(await bcrypt.compare(token, user.refreshTokenHash))) {
    throw ApiError.unauthorized('Refresh token no longer valid')
  }

  await issueSession(req, res, user)
  res.status(204).send()
})

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken
  if (token) {
    try {
      const payload = verifyRefreshToken(token)
      await User.findByIdAndUpdate(payload.sub, { refreshTokenHash: null })
    } catch {
      // token already invalid/expired — nothing to revoke
    }
  }
  res.clearCookie('accessToken', clearAccessCookieOptions(req))
  res.clearCookie('refreshToken', clearRefreshCookieOptions(req))
  res.status(204).send()
})

export const me = asyncHandler(async (req, res) => {
  res.json(req.user)
})
