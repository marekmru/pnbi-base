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

const messages = {
  en: {
    confirmed: function () {
      return 'Your password is not confirmed'
    },
    numbers: function () {
      return 'I really dont like your email'
    }
  }
}

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

// Override and merge the dictionaries
// VeeValidate.localize(dictionary)

Vue.config.productionTip = false
/* eslint-disable no-new */
/*
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
*/
app.$VeeValidate.updateDictionary(messages)
