/// ///////PNBI BASE /////////
import router from './routes'
import PnbiBase from 'pnbi-base/src'
import Vue from 'vue'

const port = '5060'
const isApiBaseDefined = (window.BIAPIBASE != null) && !window.BIAPIBASE.includes('echo var')
const basePath = isApiBaseDefined ? window.BIAPIBASE : `http://localhost:${port}`
const config = {
  API: basePath,
  MAIN_ROUTE: 'start',
  TITLE: 'Demo App',
  APP_IDENTIFIER: 'demo_app',
  IGNORED_ERRORS: []
}

Vue.use(PnbiBase, {
  router,
  config
})
/// ///////PNBI BASE /////////
export default config
