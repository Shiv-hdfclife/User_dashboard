export interface User {
  id: number
  name: string
  email: string
  username: string
  phone?: string
  website?: string
  company?: {
    name: string
  }
  address?: {
    city: string
    zipcode: string
  }
}

export interface CreateUserPayload {
  name: string
  email: string
  username: string
}
