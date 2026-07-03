export type UserRole = 'customer' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  avatarUrl?: string
  createdAt: string
}

export interface Address {
  id: string
  fullName: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  phone: string
  isDefault: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
}
