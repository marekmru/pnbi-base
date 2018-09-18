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
import numeral from 'numeral'

// load a locale
numeral.register('locale', 'fr', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't'
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème'
  },
  currency: {
    symbol: '€'
  }
})

// switch between locales
numeral.locale('de')

Vue.use(PnbiBase, {
  router,
  config,
  numeral
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

Vue.filter('tablePlusFilter', function (value, format) {
  if (!value) return ''
  if (format) {
    value = numeral(value).format()
    console.log('value', value)
  }
  // console.log(value, format)
  return value
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
