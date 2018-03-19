import router from '@/router'
import axios from 'axios'
import is from 'is'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'
import EventBus, { ERROR } from './event-bus'
function isErrorIgnoreRoute() {
  console.log(['login', 'reset', 'forbidden'].indexOf(router.history.current.name))
  return ['login', 'reset', 'forbidden'].indexOf(router.history.current.name) > -1;
/*   return (
    router.history.current.name === 'login' ||
    router.history.current.name === 'reset'
  ) */
}
const ingnoredErrors = BI_BASE_CONFIG.IGNORED_ERRORS || []
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 500
    if (is.undefined(error.response)) {
      EventBus.$emit(ERROR, {
        data: {
          status_code: '500',
          result: {
            message: 'Unknown error'
          }
        }
      })
      return Promise.reject(error)
    }
    if (isErrorIgnoreRoute() === false) {
      // 401 >> not authorized
      if (error.response.status === 401) {
        router.push({ name: 'login' })
      }
      // 403 >> not allowed -> goto forbidden page
      if (error.response.status === 403) {
        router.push({ name: 'forbidden' })
      }
      if (ingnoredErrors.indexOf(error.response.status) === -1) {
        EventBus.$emit(ERROR, error.response)
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
