import router from '@/router'
import axios from 'axios'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'
import EventBus, { ERROR } from "./event-bus";
function isAuthRoute() {
    return router.history.current.name === 'login' ||
    router.history.current.name === 'reset'
}
const ingnoredErrors = BI_BASE_CONFIG.IGNORED_ERRORS || []
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401 && isAuthRoute() === false) {
      router.push('/')
    } else {
      
        if (ingnoredErrors.indexOf(error.response.status) > -1 || isAuthRoute() ) {
          return Promise.reject(error)
        } else {
          EventBus.$emit(ERROR, error.response)
          return Promise.reject(error)
        }
    }
  }
)
axios.interceptors.request.use(
  (request) => {
    request.headers['Accept'] = 'application/json'
    request.withCredentials = true
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)
