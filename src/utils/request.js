import axios from 'axios'
import store from '../store'
import router from '@/router'

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
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  if (error.response || error.response.status === 401) {
    // 1.如果没有refresh_token,则直接跳转登录页
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }
    // 如果有refresh_token则跟新token
    try {
      const { data } = await axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 3. 如果刷新 token 成功了，则把新的 token 更新到容器中
      store.commit('setUser', {
        ...user,
        token: data.data.token
      })
      // 把之前失败的请求发出去
      return request(error.config)
    } catch (error) {
      redirectLogin()
    }
  }
  return Promise.reject(error)
})
function redirectLogin () {
  router.push({
    name: 'login',
    // query 参数会以 ?key=value&key=value 的格式添加到 url 后面
    // 这里使用查询参数把要跳转回来的路由地址传递给了登录页面
    // router.currentRoute 就是当前路由对象，好比我们在组件中的 this.$route
    // 当前路由对象的fullPath 就是当前路由的路径
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
