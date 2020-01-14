import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user') // 一个对象，包含用户登录的token信息
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      if (data && data.token) { // 解析token得到用户id
        data.id = decodeJwt(data.token).user_id
      }
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
