import axios from 'axios'
import { ElMessage } from 'element-plus'

const http = axios.create({
  baseURL: 'https:/v3pz.itndedu.com/v3pz', // 后端地址
  timeout: 10000,
})

// 添加请求拦截器
http.interceptors.request.use(
  function (config: any) {
    // 不需要添加token的api
    const whiteUrl = ['/login', '/get/code', '/user/authentication']
    const token = localStorage.getItem('token')
    if (token && !whiteUrl.includes(config.url)) {
      config.headers['X-token'] = token
      // 临时
      // config.headers['auth'] = '13797053405'
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 对于接口返回异常的数据，给用户一点提示
    if (response.data.code === -1) {
      ElMessage.warning(response.data.message)
    }
    // token失效
    if (response.data.code === -2) {
      // 清除token
      localStorage.removeItem('token')
      // 清除用户信息
      localStorage.removeItem('userInfo')
      // 清楚持久化信息
      localStorage.removeItem('pz_vuex')
      // 跳转到登录页
      window.location.href = window.location.origin
    }
    return response
  },
  function (error) {
    // 对响应错误做点什么
    ElMessage.error('网络异常，请检查！')
    return Promise.reject(error)
  },
)

export default http
