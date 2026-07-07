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

function baseCookieOptions() {
  const isProd = env.nodeEnv === 'production'
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  }
}

export function accessCookieOptions() {
  return {
    ...baseCookieOptions(),
    path: '/api',
    maxAge: parseDurationMs(env.jwtAccessExpiresIn, 15 * 60 * 1000),
  }
}

export function refreshCookieOptions() {
  return {
    ...baseCookieOptions(),
    path: '/api/auth',
    maxAge: parseDurationMs(env.jwtRefreshExpiresIn, 30 * 24 * 60 * 60 * 1000),
  }
}

export function clearAccessCookieOptions() {
  const { maxAge, ...rest } = accessCookieOptions()
  return rest
}

export function clearRefreshCookieOptions() {
  const { maxAge, ...rest } = refreshCookieOptions()
  return rest
}
