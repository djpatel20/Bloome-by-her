import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/hooks/useCategories'
import type { ProductFilters } from '@/types'

const RATING_OPTIONS = [4, 3, 2, 1]

export function ShopFilters({
  filters,
  onChange,
}: {
  filters: ProductFilters
  onChange: (next: ProductFilters) => void
}) {
  const { data: categories } = useCategories()

  function toggleCategory(categoryId: string) {
    const current = filters.categoryIds ?? []
    const next = current.includes(categoryId)
      ? current.filter((id) => id !== categoryId)
      : [...current, categoryId]
    onChange({ ...filters, categoryIds: next, page: 1 })
  }

  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-foreground">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-xs text-muted-foreground"
          onClick={() => onChange({ page: 1, pageSize: filters.pageSize })}
        >
          Clear All
        </Button>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-bold text-muted-foreground uppercase">Categories</h4>
        <div className="flex flex-col gap-2">
          {categories?.map((category) => (
            <Label key={category.id} className="flex items-center gap-2 text-sm font-normal">
              <Checkbox
                checked={filters.categoryIds?.includes(category.id) ?? false}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              {category.name}
              <span className="text-xs text-muted-foreground">({category.productCount})</span>
            </Label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-bold text-muted-foreground uppercase">Price Range</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            className="rounded-full"
            value={filters.minPrice ?? ''}
            onChange={(event) =>
              onChange({
                ...filters,
                minPrice: event.target.value ? Number(event.target.value) : undefined,
                page: 1,
              })
            }
          />
          <Input
            type="number"
            placeholder="Max"
            className="rounded-full"
            value={filters.maxPrice ?? ''}
            onChange={(event) =>
              onChange({
                ...filters,
                maxPrice: event.target.value ? Number(event.target.value) : undefined,
                page: 1,
              })
            }
          />
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xs font-bold text-muted-foreground uppercase">Rating</h4>
        <div className="flex flex-col gap-2">
          {RATING_OPTIONS.map((rating) => (
            <Label key={rating} className="flex items-center gap-2 text-sm font-normal">
              <Checkbox
                checked={filters.minRating === rating}
                onCheckedChange={(checked) =>
                  onChange({ ...filters, minRating: checked ? rating : undefined, page: 1 })
                }
              />
              {rating}+ Stars
            </Label>
          ))}
        </div>
      </div>
    </aside>
  )
}
