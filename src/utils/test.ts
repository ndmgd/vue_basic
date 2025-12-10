import axios from 'axios'
import { ElMessage } from 'element-plus'

let baseUrl="http://127.0.0.1:8000/";
  
const request = axios.create({
  baseURL: baseUrl, // 后端地址
  timeout: 10000,
  withCredentials: true, // 允许携带跨域凭证（与后端 CORS_ALLOW_CREDENTIALS 对应）
})

// 请求拦截器：添加 JWT Token
request.interceptors.request.use(
    (config) => {
    // 打印最终请求的完整URL
        console.log("最终请求URL：", config.baseURL + config.url); 
        console.log("最终请求参数：", config.data);
    // 从 sessionStorage 获取 Token
    const token = sessionStorage.getItem('access_token')
    if (token) {
      // 如果存在 Token，则添加到请求头中
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
  (response) =>
    // 无响应拦截器时，你拿到的result是这个结构：
    // Axios 默认返回的响应是一个包含多层的对象
    // {
    //   data: {code:200, token:"xxx"}, // 后端实际返回的数据
    //   status: 200, // HTTP状态码
    //   statusText: "OK",
    //   headers: {...}, // 响应头
    //   config: {...} // 请求配置
    // }
    // 直接返回后端数据,去掉 Axios 默认的包装
    response.data,
  (error) => {
    ElMessage.error('请求失败')
    return Promise.reject(error)
  },
)

/*网络请求部分*/

/*
 *  get请求
 *  url:请求地址
 *  params:参数
 * */
export function get(url: string, params = {}) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'get',
            params: params
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

/*
 *  post请求
 *  url:请求地址
 *  params:参数
 * */
export function post(url: string, params = {}) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'post',
            data: params
        }).then(response => {
            console.log(response)
            resolve(response);
        }).catch(error => {
            console.log(error)
            reject(error);
        });
    });
}

/*
 *  delete请求
 *  url:请求地址
 *  params:参数
 * */
export function del(url: string, params = {}) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'delete',
            data: params
        }).then(response => {
            console.log(response)
            resolve(response);
        }).catch(error => {
            console.log(error)
            reject(error);
        });
    });
}


/*
 *  文件上传
 *  url:请求地址
 *  params:参数
 * */
export function fileUpload(url: string, params = {}) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'post',
            data: params,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export function getServerUrl(){
    return baseUrl;
}

export default {
    request,
    get,
    post,
    del,
    fileUpload,
    getServerUrl
}
// export default request
