import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Bloome By Her'
const SITE_URL = 'https://bloome-by-her.vercel.app'
const DEFAULT_DESCRIPTION =
  'Shop handmade pipe cleaner flowers, bouquets, keychains, hair clips and more from Bloome By Her.'
const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`

interface SeoProps {
  title: string
  /** Set true when `title` is already the complete page title (e.g. the homepage tagline). */
  titleIsComplete?: boolean
  description?: string
  /** Absolute image URL. Falls back to the site default share image. */
  image?: string
  /** Path (e.g. "/product/rose-bouquet") or absolute URL. Falls back to the site root. */
  path?: string
  type?: 'website' | 'product'
}

/**
 * Sets per-page <title>/description/Open Graph/Twitter tags via react-helmet-async.
 *
 * Note: this only updates the DOM client-side, so it's picked up by Google (which
 * executes JS) but NOT by non-JS social crawlers (WhatsApp/Facebook/etc). Those are
 * served pre-rendered tags by `frontend/middleware.ts` instead — this component and
 * the middleware should stay in sync on title/description/image conventions.
 */
export function Seo({
  title,
  titleIsComplete = false,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  path = '/',
  type = 'website',
}: SeoProps) {
  const fullTitle = titleIsComplete ? title : `${title} — ${SITE_NAME}`
  const url = path.startsWith('http') ? path : `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
