import PnbiWebapp from './components/pnbi-webapp/PnbiWebapp'
import PnbiPage from './components/pnbi-page/PnbiPage'
import PnbiCard from './components/pnbi-card/PnbiCard'
import PnbiDialog from './components/pnbi-dialog/PnbiDialog'
import PnbiNumbers from './components/pnbi-numbers/PnbiNumbers'
import { setRoutes } from './internal/routes/index.js'
import { setAjaxConfig } from './internal/axios.config.js'
import { setCookieConfig } from './internal/cookie.service.js'
import { setStore } from './store'
import PnbiDataTable from './components/pnbi-table/PnbiTable'
// import PnbiDataTablePlus from './components/pnbi-table-plus/PnbiTablePlus'
import PnbiEmpty from './components/pnbi-empty/PnbiEmpty'
import bus from './event-bus'
import helper from './helper'
import './plugins/vee-validate'
import VeeValidate, { Validator } from 'vee-validate'
import de from 'vee-validate/dist/locale/de'
import Router from 'vue-router'
// Vee-Validator
// app wide styles, fonts

import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import 'vuetify/dist/vuetify.min.css'
import './styles/typography.scss'
import './styles/index.scss'
import './styles/theme-dark.scss'
import './styles/theme-light.scss'

import numbro from 'numbro'
import deDE from 'numbro/languages/de-DE.js'

numbro.registerLanguage(deDE)
numbro.setLanguage(deDE.languageTag)

const install = (Vue, options) => {
  Vue.prototype.$bus = bus
  Vue.prototype.$helper = helper
  Vue.prototype.$store = options.store
  Vue.prototype.$numbro = numbro
  /// /////////////////
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
  Vue.use(Router)
  Vue.use(VeeValidate, {
    aria: false,
    locale: 'de'
  })
  Validator.localize('de', de)
  Validator.localize(dictionary)
  // 1. setup store (holds all informations)
  setStore(options.store)
  options.store.dispatch('initializeApp', options.config)
  // 2.
  setRoutes(options.router)
  // 3
  setAjaxConfig(options.config)
  setCookieConfig(options.config.API)

  Vue.component('pnbi-dialog', PnbiDialog)
  Vue.component('pnbi-numbers', PnbiNumbers)
  Vue.component('pnbi-card', PnbiCard)
  Vue.component('pnbi-page', PnbiPage)
  Vue.component('pnbi-datatable', PnbiDataTable)
  Vue.component('pnbi-webapp', PnbiWebapp)
  Vue.component('pnbi-empty', PnbiEmpty)

  Vue.use(Vuetify, {
    theme: options.config.THEME,
    iconfont: 'md',
    options: {
      customProperties: true, // color: var(--v-primary-base)
      themeVariations: ['primary', 'accent', 'secondary', 'warning']
    }
  })
}

export default {
  install
}

export { PnbiWebapp }
