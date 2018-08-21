import Vue from 'vue'
import App from './App'
import './pnbi.base.config'
import router from './routes'

import config from '@/config/filters.js'
// import '@/config/highcharts.js'
import '@/config/packages.js'

import PnbiBase from 'pnbi-base/src'
Vue.use(PnbiBase, {
  router,
  config
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})