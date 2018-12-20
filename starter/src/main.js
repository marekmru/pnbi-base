import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import config from './pnbi.base.config'
import router from './routes'
import store from './store'
import '@/config/filters.js'
// import '@/config/highcharts.js'
import '@/config/packages.js'
import PnbiBase from 'pnbi-base/src'

Vue.use(PnbiBase, {
  router,
  config
})

Vue.use(VeeValidate)
var app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

Vue.config.productionTip = false
