import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import type { Category } from '@/types'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`${ROUTES.shop}?category=${category.slug}`}
      className="flex flex-col items-center gap-2 text-center"
    >
      <div className="flex size-20 items-center justify-center overflow-hidden rounded-full border border-border bg-brand-blush transition group-hover:shadow-md sm:size-24">
        <img src={category.imageUrl} alt={category.name} className="size-full object-cover" />
      </div>
      <span className="text-sm font-semibold text-foreground">{category.name}</span>
    </Link>
  )
}
