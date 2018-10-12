import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createLogger()],
  strict: false,
  modules: {
    state
  }
})
