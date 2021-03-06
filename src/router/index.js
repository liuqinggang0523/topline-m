import Vue from 'vue'
import VueRouter from 'vue-router'
// import Tabbar from '@/views/Tabbar'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
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
  }, {
    path: '/search',
    component: () => import('@/views/search')
  }, {
    path: '/article/:articleID',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 路由参数映射到组件的props中
  }, {
    path: '/userprofile',
    name: 'user-profile',
    component: () => import('@/views/userprofile')
  }, {
    path: '/my-article/:type?',
    name: 'my-article',
    component: () => import('@/views/userarticle'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
