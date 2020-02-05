import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user'), // 一个对象，包含用户登录的token信息
    cachePage: ['TabBar']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      if (data && data.token) { // 解析token得到用户id
        data.id = decodeJwt(data.token).user_id
      }
      setItem('user', state.user)
    },
    // 添加缓存页面
    addCachePage (state, name) {
      if (!state.cachePage.includes(name)) {
        state.cachePage.push(name)
      }
    },
    // 移除缓存页面
    removeCachePage (state, name) {
      const index = state.cachePage.indexOf(name)
      if (index !== -1) {
        state.cachePage.splice(index)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
