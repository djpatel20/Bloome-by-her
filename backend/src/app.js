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

app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      // Non-browser requests (curl, server-to-server, health checks) send no Origin header.
      if (!origin || env.clientUrls.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`))
      }
    },
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())
if (!isProduction) {
  app.use(morgan('dev'))
}

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use('/api', routes)
app.get("/", (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.send(`Bloome By Her Backend is Running 🚀 at ${baseUrl}`);
});
app.use(notFound)
app.use(errorHandler)
