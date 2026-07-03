import { isProduction } from '../config/env.js'

export function errorHandler(err, _req, res, _next) {
  const statusCode = err.isApiError ? err.statusCode : err.name === 'ValidationError' ? 400 : 500

  if (!err.isApiError && statusCode === 500) {
    console.error(err)
  }

  res.status(statusCode).json({
    message: err.message || 'Something went wrong',
    ...(isProduction ? {} : { stack: err.stack }),
  })
}
