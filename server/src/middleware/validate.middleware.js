import { ApiError } from '../utils/ApiError.js'

export function validateBody(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      throw ApiError.badRequest(result.error.issues[0]?.message ?? 'Invalid request body')
    }
    req.body = result.data
    next()
  }
}

export function validateQuery(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      throw ApiError.badRequest(result.error.issues[0]?.message ?? 'Invalid query parameters')
    }
    req.query = result.data
    next()
  }
}
