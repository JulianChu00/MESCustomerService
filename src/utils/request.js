// 引入axios
import axios from 'axios'

// 创建axios实例，设置基础配置
const service = axios.create({
  // 基础请求地址，开发环境下由vite代理
  baseURL: '/api',
  // 请求超时时间
  timeout: 10000
})

// 请求拦截器：在请求发送前统一处理
service.interceptors.request.use(
  config => {
    // 这里可以添加token等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  error => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 响应拦截器：统一处理响应数据和错误
service.interceptors.response.use(
  response => {
    // 直接返回响应数据
    return response.data
  },
  error => {
    // 响应错误统一处理
    let message = '请求失败，请稍后重试'
    if (error.response) {
      // 根据状态码自定义错误信息
      switch (error.response.status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请重新登录'
          break
        case 403:
          message = '没有权限访问'
          break
        case 404:
          message = '请求地址不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = error.response.data.message || message
      }
    } else if (error.message.includes('timeout')) {
      message = '请求超时，请检查网络'
    }
    // 可以用Element Plus等UI库弹出错误提示
    // ElMessage.error(message)
    return Promise.reject(message)
  }
)

// 导出通用请求方法
export default service