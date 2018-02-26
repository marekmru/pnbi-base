// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Validator } from 'vee-validate'
import de from 'vee-validate/dist/locale/de'
import numeral from 'numeral'
import moment from 'moment'
import Vuex from 'vuex'
import store from '@/store'
import money from 'v-money'

import PnbiNavbar from './pnbi-base'
// register directive v-money and component <money>
Vue.use(money, {
  thousands: '.',
  decimal: ',',
  prefix: '',
  suffix: ' T€',
  precision: 0
})
// switch between locales
moment.locale('de')
numeral.register('locale', 'de', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return '.'
  },
  currency: {
    symbol: '€'
  }
})
numeral.locale('de')
Vue.use(Vuex)
Validator.localize('de', de)

Vue.use(PnbiNavbar)
Vue.config.productionTip = false

Vue.filter('teuro', function (value) {
  return numeral(value / 1000).format('0,0') + ' T€'
})
Vue.filter('mio', function (value) {
  return numeral(value / 1000000).format('0,0.00') + ' Mio.'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

window.addEventListener('message', e => {
  if (process.env.NODE_ENV !== 'production') {
    // console.clear()
  }
})
