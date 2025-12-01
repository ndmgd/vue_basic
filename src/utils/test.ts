// import axios from 'axios'
// import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
// import { ElMessage } from 'element-plus'
// import router from '@/router'

// const BASE_URL = 'http://127.0.0.1:8000/'
// const TIMEOUT = 10000

// const request: AxiosInstance = axios.create({
//   baseURL: BASE_URL,
//   timeout: TIMEOUT,
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//   },
// })

// // 请求拦截器：使用 InternalAxiosRequestConfig 类型
// request.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = localStorage.getItem('access_token')
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error: AxiosError) => {
//     ElMessage.error('请求发送失败，请检查网络')
//     return Promise.reject(error)
//   },
// )

// // 响应拦截器
// request.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response.data
//   },
//   (error: AxiosError) => {
//     const status = error.response?.status
//     switch (status) {
//       case 401:
//         localStorage.removeItem('access_token')
//         localStorage.removeItem('refresh_token')
//         ElMessage.error('登录已失效，请重新登录')
//         router.push('/login')
//         break
//       case 403:
//         ElMessage.error('没有权限访问该资源')
//         break
//       case 404:
//         ElMessage.error('请求的资源不存在')
//         break
//       case 500:
//         ElMessage.error('服务器内部错误，请稍后再试')
//         break
//       default:
//         ElMessage.error(`请求失败：${error.message || '未知错误'}`)
//     }
//     return Promise.reject(error)
//   },
// )

// export const http = {
//   get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
//     return request.get(url, config)
//   },
//   post<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> {
//     return request.post(url, data, config)
//   },
//   put<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> {
//     return request.put(url, data, config)
//   },
//   delete<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
//     return request.delete(url, config)
//   },
// }

// export default request

// src/utils/request.ts
// import axios from 'axios'
// import type { InternalAxiosRequestConfig, AxiosError } from 'axios'
// import { ElMessage } from 'element-plus'

// const request = axios.create({
//   baseURL: 'http://127.0.0.1:8000', // 直接使用后端地址（已通过 Django CORS 允许跨域）
//   timeout: 10000,
//   withCredentials: true, // 允许携带凭证（配合后端 CORS_ALLOW_CREDENTIALS = True）
// })

// // 请求拦截器：添加 Token
// request.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = sessionStorage.getItem('access_token') // 从 sessionStorage 获取
//     if (token && config.headers) {
//       // 必须以 Bearer 前缀传递（后端 TestView 已适配这种格式）
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error: AxiosError) => {
//     ElMessage.error('请求发送失败')
//     return Promise.reject(error)
//   },
// )

// // 响应拦截器：直接返回后端数据（无需额外 .data 嵌套）
// request.interceptors.response.use(
//   (response) => response.data, // 后端返回的 { code, msg, data } 直接返回
//   (error: AxiosError) => {
//     ElMessage.error('请求失败')
//     return Promise.reject(error)
//   },
// )

// export default request

// src/utils/request.ts
import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  baseURL: 'http://127.0.0.1:8000', // 后端地址
  timeout: 10000,
  withCredentials: true, // 允许携带跨域凭证（与后端 CORS_ALLOW_CREDENTIALS 对应）
})

// 请求拦截器：添加 JWT Token
request.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // 以 Bearer 格式传递 Token
    }
    return config
  },
  (error) => {
    ElMessage.error('请求发送失败')
    return Promise.reject(error)
  },
)

// 响应拦截器：直接返回后端数据
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    ElMessage.error('请求失败')
    return Promise.reject(error)
  },
)

export default request
