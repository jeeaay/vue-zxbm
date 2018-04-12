import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/Login'
import Home from '@/components/common/Home'
import Index from '@/components/pages/Index'
import User from '@/components/pages/User'
import Notfound from '@/components/pages/Notfound'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      meta: { title: '欢迎登录-黎明重工在线报名系统管理后台' },
      component: Login
    },
    /*
    {
      path: '/SignIn',
      name: 'SignIn',
      meta: {title: '注册用户'},
      component: SignIn
    }, */
    {
      path: '*',
      name: '404',
      component: Notfound
    },
    {
      path: '/admin',
      component: Home,
      meta: {
        requireAuth: true
      },
      children: [
        { path: '/', component: Index, name: 'index', meta: { title: '报名信息-黎明重工在线报名系统管理后台' } },
        { path: 'user', component: User, name: 'user', meta: { title: '用户管理-黎明重工在线报名系统管理后台' } }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('access_token')
  let nowTime = new Date()
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (token && (nowTime.getTime() < localStorage.getItem('expires_time') * 1000)) {
      next()
    } else {
      localStorage.clear()
      next({path: '/'})
    }
  } else {
    next()
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
