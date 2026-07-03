import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import * as authController from '../controllers/auth.controller.js'
import { validateBody } from '../middleware/validate.middleware.js'
import { registerSchema, loginSchema } from '../validators/auth.validator.js'
import { requireAuth } from '../middleware/auth.middleware.js'

const router = Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/register', authLimiter, validateBody(registerSchema), authController.register)
router.post('/login', authLimiter, validateBody(loginSchema), authController.login)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)
router.get('/me', requireAuth, authController.me)

export default router
