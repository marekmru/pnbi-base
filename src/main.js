// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import VueNoty from 'vuejs-noty'
import VueMaterial from 'vue-material'
import axios from 'axios'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VeeValidate)
Vue.use(VueNoty)
Vue.use(VueResource)
Vue.use(VueMaterial)

// Add a 401 response interceptor
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401 &&
      router.history.current.name !== 'login' &&
      router.history.current.name !== 'reset') {
      console.log(router.history.current.name)
      router.push('/')
    } else {
      return Promise.reject(error)
    }
  }
)
axios.interceptors.request.use(
  (request) => {
    request.headers['Accept'] = 'application/json'
    request.withCredentials = true
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  request.headers.set('Accept', 'application/json')
  next()
})

Vue.config.productionTip = false

window.BI_BASE_CONFIG = {
  API: 'http://localhost:5010',
  MAIN_ROUTE: 'overview'
}
/* eslint-disable no-new */
const PnbiBase = new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
export default PnbiBase
