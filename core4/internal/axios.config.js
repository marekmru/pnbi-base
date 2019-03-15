import axios from 'axios'
import router from './routes/index.js'
import Vue from 'vue'

export const axiosInternal = axios.create({
  baseURL: window.APIBASE_CORE
})

axios.defaults.baseURL = window.APIBASE_APP

export function setAjaxConfig (config) {
  // helpers
  const ingnoredErrors = config.IGNORED_ERRORS || []
  const ignoredEndpoints = ['/logout', '/profile']
  function isErrorIgnoreRoute () {
    return router.publicPages.includes(router.instance.history.current.path)// > -1
  }
  function isIgnoredEndopoint (responseURL = '') {
    return ignoredEndpoints.includes(responseURL) // > -1
  }
  function isIgnoredErrorCode (error) {
    return !ingnoredErrors.includes(error.response.status)
  }
  function isLandingPage () {
    return router.instance.history.current.path === '/'
  }
  // AXIOS //
  // used in pnbi-base client
  // used internally by Auth.js because Auth Path is different then api above
  const instances = [axios, axiosInternal]
  instances.forEach(axiosInstance => {
    axiosInstance.defaults.headers.common['Accept'] = 'application/json'
    axiosInstance.interceptors.response.use(
      response => {
        return response.data
      },
      error => {
        const isAuthError = (isIgnoredErrorCode(error) === false) && (isIgnoredEndopoint(error.response.request.responseURL) === false)
        if (isLandingPage() && isAuthError) {
          if (window.location.hash.includes('login') === false) {
            window.location.assign(window.location + 'login')
            return
          }
        }
        if (isErrorIgnoreRoute() === false) {
          // TODO
          const is500Error = (error.response == null)
          let data = {}
          // error without corret body > fallback to defaults
          // 500 has no meaingful response
          if (is500Error) {
            data.status_code = 500
            data.html = `${this.$t('errors.is500Error')} <a href="mailto:mail@mailer.com">mail@mailer.com</a>`
          } else if (isAuthError) {
            data.status_code = error.response.status
            if (data.status_code === 401) {
              data.html = `${this.$t('errors.isAuthError')} <a href="mailto:mail@mailer.com">mail@mailer.com</a>`
            } else if (data.status_code === 403) {
              data.html = `${this.$t('errors.isPermissionsError')} <a href="mailto:mail@mailer.com">mail@mailer.com</a>`
            } else {
              data.json = error.response.data || error.response
            }
            Vue.prototype.$store.dispatch('showError', data)
          }
        }
        const loading = Vue.prototype.$store.getters.loading
        if (loading) {
          Vue.prototype.$store.dispatch('setLoading', false)
        }
        return Promise.reject(error.response.data)
      }
    )
    axiosInstance.interceptors.request.use(
      request => {
        if (request.url.includes('/login') === false) {
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
  })
}
