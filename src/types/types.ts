export interface AuthResponse {
  user: User
  token: string
}

export interface RegisterResponse {
  message: string
  ok: boolean
}

export interface User {
  id: string
  username: string
  email: string
}