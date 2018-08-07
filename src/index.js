import PnbiWebapp from './PnbiWebapp'
import PnbiPage from './PnbiPage'
import PnbiCard from './PnbiCard'
import PnbiDialog from './PnbiDialog'
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
  // Vue.prototype.$dialogMixin = DialogMixin

  Vue.component('pnbi-dialog', PnbiDialog)
  Vue.component('pnbi-card', PnbiCard)
  Vue.component('pnbi-page', PnbiPage)
  Vue.component('pnbi-datatable', PnbiDataTable)
  Vue.component('pnbi-webapp', PnbiWebapp)
  Vue.component('pnbi-empty', PnbiEmpty)

  // Vue.mixin(DialogMixin)
  // Vue.use(DialogMixin)

  Vue.use(Vuetify, {
    theme: {
      primary: '#d70f14',
      secondary: '#000000',
      accent: '#3f515d',
      // accent: '#2a2f43',
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
  PnbiWebapp
}
