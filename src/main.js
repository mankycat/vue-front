// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getRequest, postRequest, deleteRequest, putRequest} from './utils/api'
import './utils/filter_utils'
import {initMemberList} from './utils/utils'
import {mapState} from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(mapState)

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.initMemberList = initMemberList
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  // 已登入进入登入页跳转至首页，未登入跳转至任何页面跳转至登入页
  var user = store.state.user
  if (to.name === 'Login') {
    if (user) {
      /* initMemberList(store) */
      router.push({name: 'Home'})
    }
  } else {
    if (user === undefined) {
      router.push({name: 'Login'})
    } else {
      /* initMemberList(store) */
    }
  }
  next()
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
