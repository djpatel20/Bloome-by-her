import { SectionHeading } from '@/components/common/SectionHeading'
import { CategoryCard } from '@/components/category/CategoryCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useCategories } from '@/hooks/useCategories'

export function CategoriesSection() {
  const { data: categories, isLoading, isError } = useCategories()

  if (isError) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <SectionHeading title="Shop by Categories" />
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Skeleton className="size-20 rounded-full sm:size-24" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))
          : categories?.map((category) => <CategoryCard key={category.id} category={category} />)}
      </div>
    </section>
  )
}
