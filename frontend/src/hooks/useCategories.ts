import { useQuery } from '@tanstack/react-query'
import { categoryService } from '@/services/categoryService'
import { queryKeys } from '@/constants/query-keys'

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: categoryService.list,
  })
}
