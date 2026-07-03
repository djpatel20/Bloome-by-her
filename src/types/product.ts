export interface ProductImage {
  id: string
  url: string
  alt: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  compareAtPrice?: number
  images: ProductImage[]
  categoryId: string
  categoryName: string
  rating: number
  reviewCount: number
  stock: number
  isBestSeller: boolean
  isFeatured: boolean
  tags: string[]
  createdAt: string
}

export interface ProductFilters {
  categoryIds?: string[]
  minPrice?: number
  maxPrice?: number
  minRating?: number
  search?: string
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'best-selling'
  page?: number
  pageSize?: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
