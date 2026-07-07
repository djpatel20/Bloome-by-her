import { next } from '@vercel/functions'

// Vercel Routing Middleware (framework-agnostic, works with plain Vite).
// Real browsers always fall through to `next()` and get the normal SPA — this
// only intercepts non-JS social/search crawlers so they see real per-page
// Open Graph / Twitter tags instead of the empty index.html shell.
//
// Keep title/description/image conventions in sync with
// `frontend/src/components/common/Seo.tsx` (the client-side equivalent used
// by Google, which does execute JS).

export const config = {
  matcher: ['/', '/product/:slug*', '/shop', '/about', '/contact', '/reviews'],
}

const SITE_NAME = 'Bloome By Her'
const DEFAULT_DESCRIPTION =
  'Shop handmade pipe cleaner flowers, bouquets, keychains, hair clips and more from Bloome By Her.'
const API_ORIGIN = 'https://bloome-by-her.onrender.com'

// Matches the major social/search crawlers that fetch a URL to build a link
// preview card without executing JavaScript.
const CRAWLER_UA_PATTERN =
  /facebookexternalhit|Facebot|Twitterbot|WhatsApp|LinkedInBot|Slackbot|Discordbot|TelegramBot|Pinterest|redditbot|Google-InspectionTool|bingbot|Googlebot/i

interface ProductImage {
  url: string
}

interface ProductPreview {
  name: string
  description: string
  images: ProductImage[]
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderHtml({
  title,
  description,
  image,
  url,
  type = 'website',
}: {
  title: string
  description: string
  image: string
  url: string
  type?: string
}): Response {
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)
  const safeImage = escapeHtml(image)
  const safeUrl = escapeHtml(url)

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:url" content="${safeUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
  </head>
  <body></body>
</html>`

  return new Response(html, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

export default async function middleware(request: Request) {
  const userAgent = request.headers.get('user-agent') ?? ''
  if (!CRAWLER_UA_PATTERN.test(userAgent)) {
    return next()
  }

  const url = new URL(request.url)
  const defaultImage = `${url.origin}/og-default.jpg`

  const productMatch = url.pathname.match(/^\/product\/([^/]+)\/?$/)
  if (productMatch) {
    const slug = productMatch[1]
    try {
      const res = await fetch(`${API_ORIGIN}/api/products/${slug}`)
      if (res.ok) {
        const product = (await res.json()) as ProductPreview
        return renderHtml({
          title: `${product.name} — ${SITE_NAME}`,
          description: product.description || DEFAULT_DESCRIPTION,
          image: product.images[0]?.url || defaultImage,
          url: url.toString(),
          type: 'product',
        })
      }
    } catch {
      // fall through to the site-wide preview below
    }
  }

  return renderHtml({
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    image: defaultImage,
    url: url.toString(),
  })
}
