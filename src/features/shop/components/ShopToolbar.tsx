import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ProductFilters } from '@/types'

const SORT_OPTIONS: { value: NonNullable<ProductFilters['sort']>; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'best-selling', label: 'Best Selling' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export function ShopToolbar({
  filters,
  total,
  onChange,
}: {
  filters: ProductFilters
  total?: number
  onChange: (next: ProductFilters) => void
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="rounded-full pl-9"
          value={filters.search ?? ''}
          onChange={(event) => onChange({ ...filters, search: event.target.value, page: 1 })}
        />
      </div>

      <div className="flex items-center gap-3">
        {typeof total === 'number' && (
          <span className="text-sm text-muted-foreground">{total} products</span>
        )}
        <Select
          value={filters.sort ?? 'newest'}
          onValueChange={(value) =>
            onChange({ ...filters, sort: value as ProductFilters['sort'], page: 1 })
          }
        >
          <SelectTrigger className="w-40 rounded-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
