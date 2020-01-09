import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user') // 一个对象，包含用户登录的token信息
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
