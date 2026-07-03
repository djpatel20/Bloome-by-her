import { useQuery } from '@tanstack/react-query'
import { homepageService } from '@/services/homepageService'

export function useInstagramGallery() {
  return useQuery({
    queryKey: ['homepage', 'instagram-gallery'],
    queryFn: homepageService.instagramGallery,
  })
}
