import axios from 'axios'
import EventBus, { LOADING, ERROR } from '../event-bus'

export function isErrorIgnoreRoute (router) {
  if (router.history.current.name == null) {
    return true
  }
  return (
    ['login', 'reset', 'imprint', 'privacy'].indexOf(
      router.history.current.name
    ) > -1
  )
}
export function setAjaxConfig (options) {
  const router = options.router
  const biBaseConfig = options.config

  const ingnoredErrors = biBaseConfig.IGNORED_ERRORS || []
  axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      // 500
      EventBus.$emit(LOADING, false)
      if (error.response == null) {
        EventBus.$emit(ERROR, {
          status_code: 500,
          html: 'Ein Server Fehler ist aufgetreten.<br>Bitte kontaktieren sie uns unter: <a href="mailto:bi-ops@plan-net.com">bi-ops@plan-net.com</a>'
        })
        return Promise.reject(error)
      }
      const isIgnoredEndopoint =
        error.response.request.responseURL.includes('/logout') ||
        error.response.request.responseURL.includes('/profile')
      if (isErrorIgnoreRoute(router) === false) {
        if (
          ingnoredErrors.indexOf(error.response.status) === -1 &&
          isIgnoredEndopoint === false
        ) {
          let data = {
            status_code: error.response.status
          }
          if (data.status_code === 401) {
            data.html = 'Bitte loggen sie sich ein.'
          } else if (data.status_code === 403) {
            data.html =
              'Sie sind nicht authorisiert, diese Ressource aufzurufen.<br>Bitte kontaktieren sie uns unter: <a href="mailto:bi-ops@plan-net.com">bi-ops@plan-net.com</a>'
          } else {
            try {
              if (error.response.data.result.data.message.includes('<')) {
                data.html = error.response.data.result.data.message
              }
            } catch (e) {
              data.json = error.response.data || error.response
            }
          }
          EventBus.$emit(ERROR, data)
        }
      }
      return Promise.reject(error)
    }
  )
  axios.interceptors.request.use(
    request => {
      request.headers['Accept'] = 'application/json'
      request.withCredentials = true
      return request
    },
    error => {
      return Promise.reject(error)
    }
  )
}
