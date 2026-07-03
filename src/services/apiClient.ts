import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/authStore'

export interface ApiErrorShape {
  message: string
  status?: number
}

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retried?: boolean
}

// Auth is carried entirely by httpOnly cookies (`withCredentials: true`) —
// no Authorization header is set here, so JS never holds a token that XSS
// could exfiltrate.
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

let refreshPromise: Promise<void> | null = null

async function refreshAccessToken(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {}, { withCredentials: true })
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const config = error.config as RetryableConfig | undefined
    const isAuthEndpoint = config?.url?.includes('/auth/')

    if (error.response?.status === 401 && config && !config._retried && !isAuthEndpoint) {
      config._retried = true
      try {
        await refreshAccessToken()
        return apiClient.request(config)
      } catch {
        useAuthStore.getState().clear()
      }
    } else if (error.response?.status === 401) {
      useAuthStore.getState().clear()
    }

    const shaped: ApiErrorShape = {
      message: error.response?.data?.message ?? error.message ?? 'Something went wrong',
      status: error.response?.status,
    }
    return Promise.reject(shaped)
  },
)
