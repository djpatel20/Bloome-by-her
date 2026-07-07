import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function signAccessToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn,
  })
}

export function signRefreshToken(user) {
  return jwt.sign({ sub: user.id }, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn,
  })
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtAccessSecret)
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwtRefreshSecret)
}

const DURATION_UNITS = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 }

function parseDurationMs(value, fallbackMs) {
  const match = /^(\d+)\s*(s|m|h|d)$/.exec(String(value).trim())
  if (!match) return fallbackMs
  const [, amount, unit] = match
  return Number(amount) * DURATION_UNITS[unit]
}

// Derived from the actual request (not NODE_ENV) so a misconfigured env var
// on the host can't silently bring back non-cross-site cookies. `req.secure`
// is accurate here because app.js sets `trust proxy`.
function baseCookieOptions(req) {
  const isHttps = req.secure
  return {
    httpOnly: true,
    secure: isHttps,
    sameSite: isHttps ? 'none' : 'lax',
  }
}

export function accessCookieOptions(req) {
  return {
    ...baseCookieOptions(req),
    path: '/api',
    maxAge: parseDurationMs(env.jwtAccessExpiresIn, 15 * 60 * 1000),
  }
}

export function refreshCookieOptions(req) {
  return {
    ...baseCookieOptions(req),
    path: '/api/auth',
    maxAge: parseDurationMs(env.jwtRefreshExpiresIn, 30 * 24 * 60 * 60 * 1000),
  }
}

export function clearAccessCookieOptions(req) {
  const { maxAge, ...rest } = accessCookieOptions(req)
  return rest
}

export function clearRefreshCookieOptions(req) {
  const { maxAge, ...rest } = refreshCookieOptions(req)
  return rest
}
