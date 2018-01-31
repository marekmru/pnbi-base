import axios from 'axios'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'
export function unwrap (object) {
  if (typeof object.data.result.message !== 'undefined') {
    return object.data.result.message
  }
  return object.data
/*   if (Object.prototype.hasOwnProperty.call(object, 'message')) {
    return object
  }
  for (var i = 0; i < Object.keys(object).length; i++) {
    if (object[Object.keys(object)[i]]) {
      var o = unwrap(object[Object.keys(object)[i]])
      if (o !== null) {
        return o
      }
    }
  }
  return null */
}
export default {
  login (user) {
    return axios.post(`${BI_BASE_CONFIG.API}/login2`, user)
      .then(result => result).catch(error => Promise.reject(error.response))
  },
  logout () {
    return axios.get(`${BI_BASE_CONFIG.API}/logout`)
      .then(result => result).catch(error => Promise.reject(error.response))
  },

  profile () {
    return axios.get(`${BI_BASE_CONFIG.API}/profile`).then(result => result).catch(error => Promise.reject(error.response))
  },
  reset (data) {
    if (data.password_code) {
      return axios.post(`${BI_BASE_CONFIG.API}/reset`, data)
        .then(result => result).catch(error => Promise.reject(error.response))
    }
    return axios.get(`${BI_BASE_CONFIG.API}/reset?email=${data.email}`)
      .then(result => result).catch(error => Promise.reject(error.response))
  }
}
