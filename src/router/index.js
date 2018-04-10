import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Home from '@/components/common/Home'
import Index from '@/components/pages/Index'
import User from '@/components/pages/User'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: { title: '请登录！' },
      component: Login
    },
    /*
    {
      path: '/SignIn',
      name: 'SignIn',
      meta: {title: '注册用户'},
      component: SignIn
    },
    {
      path: '/repository',
      name: 'repository',
      meta: {
        requireAuth: true
      },
      component: [Login, SignIn]
    }, */
    {
      path: '/admin',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [
        { path: '/', component: Index, name: '首页', meta: { title: '案例采集后台管理' } },
        { path: 'user', component: User, name: '用户管理', meta: { title: '用户管理' } }
      ]
    }
  ]
})

/* router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('access_token')
  let nowTime = new Date()
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (token && (nowTime.getTime() < localStorage.getItem('expires_time') * 1000)) {
      next()
    } else {
      localStorage.clear()
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
}) */

export default router
