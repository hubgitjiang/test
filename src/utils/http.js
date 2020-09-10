import axios from 'axios'
import { Toast } from 'vant'
import { getLocal } from '../utils/local'
import router from '../router'

// 创建副本
var instance = axios.create({
  baseURL: process.env.VUE_APP_URL
})
// 拦截器
instance.interceptors.request.use(
  function (config) {
    // 设置token
    if (config.token) {
      const _token = getLocal()
      if (_token) {
        config.headers.authorization = `Bearer ${_token}`
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 如果没有状态码 那么特殊返回 目前是 文件上传接口
    if (!response.data.code) {
      return response
    }
    if (response.data.code === 200 || response.data.code === 201 || response.config.nocheck === true) {
      return response.data
    } else if (response.data.code === 401 || response.data.code === 403) {
      Toast.fail('请先登录')
      // 去登录页
      router.toLogin()
      return Promise.reject(new Error(''))
    } else {
      return Promise.reject(new Error(''))
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default instance
