// src/types/api.ts
export interface ApiResponse {
  code: number
  msg?: string
  message?: string
  data?: any
  token?: {
    access: string
    refresh: string
  }
}
