import Vue from 'vue'
import VueRouter from 'vue-router'
// import Tabbar from '@/views/Tabbar'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import ('@/views/login')
  }, {
    path: '/',
    component: () => import('@/views/Tabbar'),
    children: [{
      path: '',
      component: () => import('@/views/homepage')
    }, {
      path: '/qa',
      component: () => import('@/views/question')
    }, {
      path: '/video',
      component: () => import('@/views/video')
    }, {
      path: '/my',
      component: () => import('@/views/my')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
