import '../core4/internal/check-incognito.js'
import PnbiCard from '../core4/components/pnbi-card/PnbiCard'
import PnbiDialog from '../core4/components/pnbi-dialog/PnbiDialog'
import PnbiEmpty from '../core4/components/pnbi-empty/PnbiEmpty'
import PnbiNumbers from '../core4/components/pnbi-numbers/PnbiNumbers'
import PnbiPage from '../core4/components/pnbi-page/PnbiPage'
import PnbiDataTable from '../core4/components/pnbi-table/PnbiTable'

import helper from '../core4/helper'
import bus, { LOADING } from '../core4/event-bus.js'

import { setCookieConfig } from './internal/cookie.service.js'

import PnbiWebapp from './components/pnbi-webapp/PnbiWebapp'
import { setRoutes } from './internal/routes.js'
import { setAjaxConfig } from './internal/config.js'
import { setApiConfig } from './Auth.js'

import VeeValidate, { Validator } from 'vee-validate'
import de from 'vee-validate/dist/locale/de'

// app wide styles, fonts
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './styles/index.scss'
import './styles/typography.scss'
import numbro from 'numbro'
import deDE from 'numbro/languages/de-DE.js'
import Router from 'vue-router'

numbro.registerLanguage(deDE)
numbro.setLanguage(deDE.languageTag)

const install = (Vue, options) => {
  Vue.prototype.$bus = bus
  Vue.prototype.$helper = helper
  Vue.prototype.$config = options.config
  Vue.prototype.$numbro = numbro
  Vue.prototype.$loader = function (status) {
    bus.$emit(LOADING, true)
  }
  Vue.use(Router)
  const dictionary = {
    de: {
      messages: {
        auth: `Bitte überprüfen Sie ihren Namen und das Passwort.`,
        emailreset: `Die E-Mail Adresse wurde nicht gefunden.`,
        passwordscore: `Das gewählte Passwort ist nicht sicher genug.`,
        confirmspecial: `Die Passwörter stimmen nicht überein.`
      }
    },
    en: {
      messages: {
        auth: `Please translate me`,
        emailreset: `Please translate me`,
        passwordscore: `Please translate me`,
        confirmspecial: `Please translate me`
      }
    }
  }
  Vue.use(VeeValidate, {
    aria: false,
    locale: 'de'
  })
  Validator.localize('de', de)
  Validator.localize(dictionary)

  setRoutes(options.router)
  setApiConfig(options.config)
  setAjaxConfig(options)
  setCookieConfig(options.config.API)

  Vue.component('pnbi-dialog', PnbiDialog)
  Vue.component('pnbi-numbers', PnbiNumbers)
  Vue.component('pnbi-card', PnbiCard)
  Vue.component('pnbi-page', PnbiPage)
  Vue.component('pnbi-datatable', PnbiDataTable)
  Vue.component('pnbi-webapp', PnbiWebapp)
  Vue.component('pnbi-empty', PnbiEmpty)
  /* TODO: possibility to pass a skin */
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
