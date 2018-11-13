import Vue from 'vue'
import App from './App'
import router from './routes'
import store from './store'
import '@/config/filters.js'
// import '@/config/highcharts.js'
import '@/config/packages.js'
import PnbiBase from 'pnbi-base/src'

Vue.use(PnbiBase, {
  router,
  config: {
    FALLBACK: '5001/core4/api/v1',
    TITLE: 'CORE 4 Tester',
    IGNORED_ERRORS: []
  },
  store
})

Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
