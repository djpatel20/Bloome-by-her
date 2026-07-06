import type { ProductFilters } from '@/types'

export const queryKeys = {
  products: {
    all: ['products'] as const,
    list: (filters: ProductFilters) => ['products', 'list', filters] as const,
    detail: (slug: string) => ['products', 'detail', slug] as const,
    bestSellers: ['products', 'best-sellers'] as const,
  },
  categories: {
    all: ['categories'] as const,
  },
  reviews: {
    byProduct: (productId: string) => ['reviews', 'product', productId] as const,
    featured: ['reviews', 'featured'] as const,
  },
  cart: {
    all: ['cart'] as const,
  },
  orders: {
    mine: ['orders', 'mine'] as const,
    detail: (id: string) => ['orders', 'detail', id] as const,
    admin: {
      list: (params?: unknown) => ['admin', 'orders', 'list', params] as const,
      detail: (id: string) => ['admin', 'orders', 'detail', id] as const,
    },
  },
  admin: {
    dashboard: ['admin', 'dashboard'] as const,
    products: {
      list: (params?: unknown) => ['admin', 'products', 'list', params] as const,
      detail: (id: string) => ['admin', 'products', 'detail', id] as const,
    },
    categories: { list: ['admin', 'categories', 'list'] as const },
    customers: { list: (params?: unknown) => ['admin', 'customers', 'list', params] as const },
    reviews: { list: (params?: unknown) => ['admin', 'reviews', 'list', params] as const },
    banners: { list: ['admin', 'banners', 'list'] as const },
    coupons: { list: ['admin', 'coupons', 'list'] as const },
    media: { list: ['admin', 'media', 'list'] as const },
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
} as const
