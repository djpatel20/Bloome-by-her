import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { env, isProduction } from './config/env.js'
import routes from './routes/index.js'
import { notFound } from './middleware/notFound.middleware.js'
import { errorHandler } from './middleware/error.middleware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const app = express()

app.use(helmet())
app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())
app.use(cookieParser())
if (!isProduction) {
  app.use(morgan('dev'))
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api', routes)

app.use(notFound)
app.use(errorHandler)
