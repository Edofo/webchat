import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.API_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
})

// Request interceptor
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/"/g, '')}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // Optionally trigger a logout or redirect here
    }
    return Promise.reject(error)
  }
)

export default api
