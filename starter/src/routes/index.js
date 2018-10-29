import Vue from 'vue'
import Router from 'vue-router'
import Start from './Start'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start,
      meta: {
        title: 'Start (routes/index.js)'
      }
    }
  ]
})
