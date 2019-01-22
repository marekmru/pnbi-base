import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PnbiBase from 'pnbi-base/src'

Vue.use(PnbiBase, {
  router,
  config: {
    TITLE: 'Starter',
    IGNORED_ERRORS: [],
    APP_IDENTIFIER: 'starter'
  },
  store
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
