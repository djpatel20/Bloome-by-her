import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { queryKeys } from '@/constants/query-keys'
import type { ProductFilters } from '@/types'

export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: queryKeys.products.list(filters),
    queryFn: () => productService.list(filters),
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: () => productService.bySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useBestSellers() {
  return useQuery({
    queryKey: queryKeys.products.bestSellers,
    queryFn: productService.bestSellers,
  })
}
