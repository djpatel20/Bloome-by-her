import { apiClient } from './apiClient'
import type { Banner } from '@/types'

export interface InstagramGalleryImage {
  id: string
  imageUrl: string
  postUrl?: string
}

export const homepageService = {
  instagramGallery: async (): Promise<InstagramGalleryImage[]> => {
    const { data } = await apiClient.get<InstagramGalleryImage[]>('/homepage/instagram-gallery')
    return data
  },
  banners: async (): Promise<Banner[]> => {
    const { data } = await apiClient.get<Banner[]>('/homepage/banners')
    return data
  },
}
