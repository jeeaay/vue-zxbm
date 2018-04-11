// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import { Form, FormItem, Input, Button, Menu, MenuItem, Dialog, Table, TableColumn, Message, Pagination, Loading } from 'element-ui'

Vue.use(Form).use(Pagination).use(Loading)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)

axios.defaults.baseURL = 'http://lmapi.com/v1/'
// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.error) {
      switch (response.data.error) {
        case 401:
          Message.error({message: response.data.message})
          localStorage.clear()
          router.replace({
            path: '/',
            query: { redirect: router.currentRoute.path }
          })
          break
        case 403:
          Message.error({message: (response.data.message ? response.data.message : '操作被拒绝')})
          break
        case 404:
          Message.error({message: (response.data.message ? response.data.message : '页面不存在')})
          break
        default:
          Message.error({message: (response.data.message ? response.data.message : '出错啦')})
      }
    }
    return response
  },
  error => {
    Message.error({message: 'token已过期 | 账号或密码错误，请尝试重新登陆'})
    localStorage.clear()
    router.replace({
      path: '/'
    })
    return error
  }
)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
