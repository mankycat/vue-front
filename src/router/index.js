import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import UpdatePwd from '@/components/UpdatePassword'
import MemberList from '@/components/MemberList'
import MemberInfo from '@/components/MemberInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/memberlist',
      children: [
        {
          path: '/updatepwd',
          name: 'UpdatePwd',
          component: UpdatePwd
        },
        {
          path: '/memberlist',
          name: 'MemberList',
          component: MemberList
        },
        {
          path: '/memberinfo',
          name: 'MemberInfo',
          component: MemberInfo
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
