import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { ProductGallery } from './components/ProductGallery'
import { ProductInfo } from './components/ProductInfo'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReviewList } from '@/components/reviews/ReviewList'
import { ReviewForm } from '@/components/reviews/ReviewForm'
import { ErrorState } from '@/components/common/ErrorState'
import { Skeleton } from '@/components/ui/skeleton'
import { useProduct } from '@/hooks/useProducts'
import { useProductReviews } from '@/hooks/useReviews'

export default function ProductDetailPage() {
  const { slug = '' } = useParams()
  const { data: product, isLoading, isError, refetch } = useProduct(slug)
  const { data: reviews, isLoading: isLoadingReviews } = useProductReviews(product?.id ?? '')

  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-2 lg:px-8">
        <Skeleton className="aspect-square rounded-3xl" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-8 w-2/3" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <ErrorState onRetry={() => refetch()} />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — Bloome By Her</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        <Tabs defaultValue="description" className="mt-10">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-sm text-muted-foreground">
            {product.description}
          </TabsContent>
          <TabsContent value="reviews">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              <ReviewList reviews={reviews ?? []} isLoading={isLoadingReviews} />
              <ReviewForm productId={product.id} />
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="text-sm text-muted-foreground">
            Each handmade item is made to order and ships within 2-3 business days. Handle with care
            — these flowers will stay beautiful forever!
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
