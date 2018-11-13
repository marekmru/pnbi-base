import axios from 'axios'
import EventBus, { ERROR } from '../event-bus'
import router from './routes/index.js'
import Vue from 'vue'

export function setAjaxConfig (config) {
  const isApiBaseDefined = (window.BIAPIBASE != null) && !window.BIAPIBASE.includes('echo var')
  const api = isApiBaseDefined ? window.BIAPIBASE : `http://localhost:${config.FALLBACK}`

  axios.defaults.baseURL = api
  axios.defaults.headers.common['Accept'] = 'application/json'

  const ingnoredErrors = config.IGNORED_ERRORS || []
  const ignoredEndpoints = ['/logout', '/profile']
  const current = router.instance.history.current
  function isErrorIgnoreRoute () {
    /*     console.log(history.current)
    if (history.current.path == null) {
      return true
    } */
    return router.publicPages.indexOf(current.path) > -1
  }
  axios.interceptors.response.use(
    response => {
      return response.data
    },
    error => {
      const isIgnoredEndopoint = ignoredEndpoints.indexOf(
        error.response.request.responseURL
      ) > -1
      /*       const isIgnoredEndopoint =
        error.response.request.responseURL.includes('/logout') ||
        error.response.request.responseURL.includes('/profile') */

      if (isErrorIgnoreRoute()) { // pass
      } else {
        let data = {}
        // error without corret body > fallback to defaults
        // 500
        if (error.response == null) {
          data.status_code = 500
          data.html = 'Ein Server Fehler ist aufgetreten.<br>Bitte kontaktieren sie uns unter: <a href="mailto:bi-ops@plan-net.com">bi-ops@plan-net.com</a>'
        } else if (
          ingnoredErrors.indexOf(error.response.status) === -1 &&
          isIgnoredEndopoint === false
        ) {
          data.status_code = error.response.status
          if (data.status_code === 401) {
            data.html = 'Bitte loggen sie sich ein.'
          } else if (data.status_code === 403) {
            data.html =
              'Sie sind nicht authorisiert, diese Ressource aufzurufen.<br>Bitte kontaktieren sie uns unter: <a href="mailto:bi-ops@plan-net.com">bi-ops@plan-net.com</a>'
          } else {
            data.json = error.response.data || error.response
          }
          // EventBus.$emit(ERROR, data)
          Vue.prototype.$store.dispatch('showError', data)
        }
      }
      return Promise.reject(error.response.data)
    }
  )
  axios.interceptors.request.use(
    request => {
      if (!request.url.includes('/login')) {
        const user = JSON.parse(window.localStorage.getItem('user'))
        if (user != null) {
          request.headers.Authorization = `Bearer ${user.token}`
        }
      }
      return request
    },
    error => {
      return Promise.reject(error)
    }
  )
}
