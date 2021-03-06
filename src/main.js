import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/dateTime'
import './utils/register-vant'
import './utils/validation'
import 'amfe-flexible' // 引入rem适配
import './styles/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
