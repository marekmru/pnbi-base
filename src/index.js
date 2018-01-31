import PnbiNavbar from './PnbiNavbar'
import VueMaterial from 'vue-material'
import VeeValidate from 'vee-validate'
import VueNoty from 'vuejs-noty'
import 'vue-material/dist/vue-material.css'
import './routes.js'
import './config.js'
// app wide styles, fonts
import './index.scss'

const install = (Vue) => {
  Vue.component('pnbi-navbar', PnbiNavbar)
  Vue.use(VueMaterial)
  Vue.use(VeeValidate)
  Vue.use(VueNoty)
}

export default {
  install
}

export {
  PnbiNavbar
}
