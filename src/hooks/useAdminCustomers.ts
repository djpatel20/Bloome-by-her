import { useQuery } from '@tanstack/react-query'
import { customerService } from '@/services/customerService'
import { queryKeys } from '@/constants/query-keys'

export function useAdminCustomers(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: queryKeys.admin.customers.list(params),
    queryFn: () => customerService.adminList(params),
  })
}
