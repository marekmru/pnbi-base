import axios from 'axios'
import debug from './$debug'
import iHelper from './internal/$internal'
import {axiosInternal} from './internal/axios.config.js'
export default {
  login (user) {
    return axiosInternal
      .post('/login', user)
      .then(result => {
        window.localStorage.setItem('user', JSON.stringify(result.data))
        return result.data
      })
      .catch(error => Promise.reject(error))
  },
  profile () {
    if (this.$profile != null) {
      return Promise.resolve(this.$profile)
    }
    return axiosInternal
      .get(`/profile`)
      .then(result => {
        this.$profile = Object.assign(result.data, {
          short: iHelper.shortName(result.data.realname)
        })
        return this.$profile
      })
      .catch(error => Promise.reject(error))
  },
  logout () {
    return axiosInternal
      .get(`/logout`)
      .then(result => {
        return result.data
      })
      .catch(error => Promise.reject(error))
  },
  password (password) {
    return debug.notImplemented('password')
    /*     return axiosInternal
      .post(`https://bi.plan-net.com/api/v2/password`, password)
      .then(result => result.data.result)
      .catch(error => Promise.reject(error)) */
  },
  reset (data) {
    // resetten mit token und neuem passwort
    if (data.token != null) {
      return axiosInternal
        .post(`/login`, data)
        .then(result => result.data)
        .catch(error => Promise.reject(error))
    }
    // anfordern mit email
    return axiosInternal
      .put(`/login`, data)
      // .put(`/login?email=${data.email}`)
      .then(result => result)
      .catch(error => Promise.reject(error))
  }
}
