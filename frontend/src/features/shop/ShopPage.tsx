import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShopFilters } from './components/ShopFilters'
import { ShopToolbar } from './components/ShopToolbar'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ErrorState } from '@/components/common/ErrorState'
import { Seo } from '@/components/common/Seo'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useProducts } from '@/hooks/useProducts'
import type { ProductFilters } from '@/types'

const PAGE_SIZE = 12

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: ProductFilters = useMemo(() => {
    const categoryParam = searchParams.get('category')
    return {
      search: searchParams.get('search') ?? undefined,
      categoryIds: categoryParam ? [categoryParam] : undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
      sort: (searchParams.get('sort') as ProductFilters['sort']) ?? undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      pageSize: PAGE_SIZE,
    }
  }, [searchParams])

  const { data, isLoading, isError, refetch } = useProducts(filters)

  function handleFiltersChange(next: ProductFilters) {
    const params = new URLSearchParams()
    if (next.search) params.set('search', next.search)
    if (next.categoryIds?.[0]) params.set('category', next.categoryIds[0])
    if (next.minPrice) params.set('minPrice', String(next.minPrice))
    if (next.maxPrice) params.set('maxPrice', String(next.maxPrice))
    if (next.minRating) params.set('minRating', String(next.minRating))
    if (next.sort) params.set('sort', next.sort)
    if (next.page && next.page > 1) params.set('page', String(next.page))
    setSearchParams(params)
  }

  return (
    <>
      <Seo
        title="Shop"
        description="Browse handmade pipe cleaner flowers, bouquets, keychains, hair clips and more."
        path="/shop"
      />
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <h1 className="mb-6 font-heading text-3xl font-bold text-foreground">Shop</h1>
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <ShopFilters filters={filters} onChange={handleFiltersChange} />

          <div className="flex flex-col gap-6">
            <ShopToolbar filters={filters} total={data?.total} onChange={handleFiltersChange} />

            {isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : (
              <ProductGrid products={data?.items ?? []} isLoading={isLoading} />
            )}

            {data && data.totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        handleFiltersChange({
                          ...filters,
                          page: Math.max(1, (filters.page ?? 1) - 1),
                        })
                      }}
                    />
                  </PaginationItem>
                  {Array.from({ length: data.totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        isActive={(filters.page ?? 1) === index + 1}
                        onClick={(event) => {
                          event.preventDefault()
                          handleFiltersChange({ ...filters, page: index + 1 })
                        }}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(event) => {
                        event.preventDefault()
                        handleFiltersChange({
                          ...filters,
                          page: Math.min(data.totalPages, (filters.page ?? 1) + 1),
                        })
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
