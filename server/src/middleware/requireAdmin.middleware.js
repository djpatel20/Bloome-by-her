import { ApiError } from '../utils/ApiError.js'

export function requireAdmin(req, _res, next) {
  if (req.user?.role !== 'admin') {
    throw ApiError.forbidden('Admin access required')
  }
  next()
}
