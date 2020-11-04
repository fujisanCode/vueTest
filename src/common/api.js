import axios from 'axios'
import Router from '@/router.js'
import url from './const.js'
// 注意：在js文件中使用element组件 按照下面更优雅哦~~
import Vue from 'vue'

let instance = axios.create({
  timeout: 30000, // 超时时间
  withCredentials: true, // 是否允许携带cookie
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Credentials': true // 配置withCredential
  }
})

instance.interceptors.request.use(
  request => {
    return request
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    // 接口200等
    return response
  },
  err => {
    // 接口401等，用promise.reject终止请求
    switch (err.response.status) {
    case url.unAuthCode:
      // Router.push('/login')
      console.log('未认证')
      Vue.prototype.$msg({text: err.response.status, color: 'info'})
      break
    case url.forbiddenCode:
      console.log('未授权')
      Vue.prototype.$msg({text: err.response.status, color: 'info'})
      break
    default:
      console.log('其他错误')
      Vue.prototype.$msg({text: err.response.status, color: 'error'})
      break
    }
    return Promise.reject(err.response.status)
  }
)

export default instance