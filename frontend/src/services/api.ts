import axios from 'axios'
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'

/**
 * Create Axios Instance
 * Pengaturan dasar axios untuk melakukan request ke API
 */
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Interceptor Request
 * Menangani request sebelum dikirim ke server
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // nanti kalau pakai token:
    // const token = localStorage.getItem('token')
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

/**
 * Interceptor Response
 * Menangani response dari server secara global
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', error.response.data)
    } else {
      console.error('Network Error:', error.message)
    }

    return Promise.reject(error)
  }
)


export default api
