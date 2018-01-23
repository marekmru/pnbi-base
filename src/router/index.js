import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/router/Login'
import Reset from '@/router/Reset'
import Overview from '@/router/Overview'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    name: 'login',
    component: Login

  },
  {
    path: '/reset/:code',
    name: 'reset',
    component: Reset
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview
  }
  ]
})

/* router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  next()
}) */
export default router

/* ,
      beforeEnter: (to, from, next) => {
        Widgets.getWidgets().then(
              widgets => {
                console.log(widgets)
                vm.widgets = widgets
              }).catch(err)

        next(
        vm => {}
        )
      } */
/*       ,
      beforeEnter: (to, from, next) => {
          next()
        } */
