import router from '@/router'
import axios from 'axios'
import is from 'is'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'
import EventBus, { LOADING, ERROR, FORBIDDEN } from './event-bus'
function isErrorIgnoreRoute() {
  return ['login', 'reset', 'imprint', 'privacy'].indexOf(router.history.current.name) > -1;
}
const ingnoredErrors = BI_BASE_CONFIG.IGNORED_ERRORS || []
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // 500
    EventBus.$emit(LOADING, false)
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
        //router.push({ name: 'forbidden' })
      const isProfile = error.response.request.responseURL.includes('/profile') 
      if (error.response.status === 401 || isProfile) {
        router.push({ name: 'login' })
      }else if (error.response.status === 403) {
        EventBus.$emit(FORBIDDEN, error.response)
      }else if (ingnoredErrors.indexOf(error.response.status) === -1) {
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
