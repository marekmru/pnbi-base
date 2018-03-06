import PnbiNavbar from './PnbiNavbar'
import './routes.js'
import './config.js'
// app wide styles, fonts
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './index.scss'

const install = (Vue) => {
  Vue.component('pnbi-navbar', PnbiNavbar)
  Vue.use(Vuetify, { theme: {
    primary: '#d70f14',
    secondary: '#000000',
    accent: '#0a7db4',
    error: '#ff6400',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }})
}

export default {
  install
}

export {
  PnbiNavbar
}

/* import axios from 'axios';
Vue.prototype.$http = axios */
