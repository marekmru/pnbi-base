import PnbiWebapp from './components/pnbi-webapp/PnbiWebapp'
import PnbiPage from './components/pnbi-page/PnbiPage'
import PnbiCard from './components/pnbi-card/PnbiCard'
import PnbiDialog from './components/pnbi-dialog/PnbiDialog'
import PnbiNumbers from './components/pnbi-numbers/PnbiNumbers'
import { setRoutes } from './internal/routes.js'
import { setAjaxConfig } from './internal/config.js'
import { setApiConfig } from './Auth.js'
import { setCookieConfig } from './internal/cookie.service.js'
import PnbiDataTable from './components/pnbi-table/PnbiTable'
import PnbiDataTablePlus from './components/pnbi-table-plus/PnbiTablePlus'
import PnbiEmpty from './components/pnbi-empty/PnbiEmpty'
import bus, { LOADING } from './event-bus'
import helper from './helper'

// app wide styles, fonts
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'
import './styles/typography.scss'
// app wide locales
import numbro from 'numbro'
import deDE from 'numbro/languages/de-DE.js'
import moment from 'moment'
/*
 * Check for installed locale
 * compare if browser locale is defined in numbroLanguages.js
 * default: us
 * TODO: global solution, not only for datatable plus
 */
numbro.registerLanguage(deDE)
numbro.setLanguage(deDE.languageTag)

const install = (Vue, options) => {
  Vue.prototype.$bus = bus
  Vue.prototype.$helper = helper
  Vue.prototype.$config = options.config
  Vue.prototype.$numbro = numbro
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
  Vue.component('pnbi-numbers', PnbiNumbers)
  Vue.component('pnbi-card', PnbiCard)
  Vue.component('pnbi-page', PnbiPage)
  Vue.component('pnbi-datatable', PnbiDataTable)
  Vue.component('pnbi-datatable-plus', PnbiDataTablePlus)
  Vue.component('pnbi-webapp', PnbiWebapp)
  Vue.component('pnbi-empty', PnbiEmpty)
  /*
  * Use this filter for custom formating includes local settings:
  * numbers – with numbro.js
  * datetime – with moment.js
  *
  * FORMAT
  * @param key = {style:'numbro.js', format:'0,0.00'}
  */
  Vue.filter('customFormatter', function (value, key) {
    if (!value) return ''
    switch (key.style) {
      case 'numbro.js':
        if (key.format) {
          value = numbro(value).format(key.format)
        } else {
          value = numbro(value).format('0,0')
        }
        break
      case 'moment.js':
        if (key.format) {
          value = moment(value).format(key.format)
        } else {
          value = moment(value).format('l')
        }
        break
    }
    return value
  })

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

export { PnbiWebapp }
