import PnbiNavbar from './PnbiNavbar'
import './routes.js'
import './config.js'

import PnbiDataTable from './PnbiTable'
import PnbiEmpty from './PnbiEmpty'
import bus from './event-bus'
import helper from './helper'
// app wide styles, fonts
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './index.scss'
import './typography.scss'

const install = (Vue) => {
  Vue.prototype.$bus = bus

  Vue.prototype.$helper = helper

  // Vue.component('pnbi-snackbar', Snackbar)
  Vue.component('pnbi-datatable', PnbiDataTable)
  Vue.component('pnbi-navbar', PnbiNavbar)
  Vue.component('pnbi-empty', PnbiEmpty)
  Vue.use(Vuetify, {
    theme: {
      primary: '#d70f14',
      secondary: '#000000',
      accent: '#3f515d',
      error: '#ff6400',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    },
    options: {
      themeVariations: ['primary', 'accent', 'secondary', 'warning']
    }
  })
}

export default {
  install
}

export {
  PnbiNavbar
}
