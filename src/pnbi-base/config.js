import router from '@/router'
import axios from 'axios'

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401 &&
      router.history.current.name !== 'login' &&
      router.history.current.name !== 'reset') {
      router.push('/')
    } else {
      return Promise.reject(error)
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
