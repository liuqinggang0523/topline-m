import axios from 'axios'
import store from '../store'

import jsonBigint from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 处理失真大数字
request.defaults.transformResponse = [function (data) {
  return data ? jsonBigint.parse(data) : {}
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    // config 配置对象，在这里实现统一数据处理
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request
