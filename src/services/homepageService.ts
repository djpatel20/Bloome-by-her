import { apiClient } from './apiClient'

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
}
