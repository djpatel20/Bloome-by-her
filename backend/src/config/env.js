import 'dotenv/config'

function required(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

const configuredClientUrls = (process.env.CLIENT_URL ?? '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  mongoUri: required('MONGO_URI'),
  // Local dev origin is always allowed alongside whatever CLIENT_URL(s) are configured.
  clientUrls: [...new Set(['http://localhost:5173', ...configuredClientUrls])],
  jwtAccessSecret: required('JWT_ACCESS_SECRET'),
  jwtRefreshSecret: required('JWT_REFRESH_SECRET'),
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  adminName: process.env.ADMIN_NAME ?? 'Admin User',
  adminEmail: process.env.ADMIN_EMAIL ?? 'admin@bloomebyher.com',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'Admin@123',
}

export const isCloudinaryConfigured = Boolean(
  env.cloudinaryCloudName && env.cloudinaryApiKey && env.cloudinaryApiSecret,
)

export const isProduction = env.nodeEnv === 'production'
