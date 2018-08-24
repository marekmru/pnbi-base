import PnbiWebapp from './PnbiWebapp'
import PnbiPage from './PnbiPage'
import PnbiCard from './PnbiCard'
import PnbiDialog from './PnbiDialog'
import {
  setRoutes
} from './routes.js'
import {
  setAjaxConfig
} from './config.js'
import {
  setApiConfig
} from './Auth.js'
import {
  setCookieConfig
} from './internal/cookie.service.js'

import PnbiDataTable from './PnbiTable'
import PnbiDataTablePlus from './PnbiTablePlus'
import PnbiEmpty from './PnbiEmpty'
import bus, {
  LOADING
} from './event-bus'
import helper from './helper'
// app wide styles, fonts
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './index.scss'
import './typography.scss'

const install = (Vue, options) => {
  Vue.prototype.$bus = bus
  Vue.prototype.$helper = helper
  Vue.prototype.$config = options.config
  Vue.prototype.$loader = function (status) {
    bus.$emit(LOADING, status => {
      this.loading = status
    })
  }
  setRoutes(options.router)
  setApiConfig(options.config)
  setAjaxConfig(options)
  setCookieConfig(options.config.API)

  Vue.component('pnbi-dialog', PnbiDialog)
  Vue.component('pnbi-card', PnbiCard)
  Vue.component('pnbi-page', PnbiPage)
  Vue.component('pnbi-datatable', PnbiDataTable)
  Vue.component('pnbi-datatable-plus', PnbiDataTablePlus)
  Vue.component('pnbi-webapp', PnbiWebapp)
  Vue.component('pnbi-empty', PnbiEmpty)

  Vue.use(Vuetify, {
    theme: {
      primary: '#d70F14',
      accent: '#3f515d',
      secondary: '#000000',
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
