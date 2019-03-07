import iHelper from './internal/$internal'
import { axiosInternal } from './internal/axios.config.js'
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
  reset (data) {
    // resetten mit token und neuem passwort und token
    // anfordern mit email
    return axiosInternal
      .put(`/login`, data)
      .then(result => result)
      .catch(error => Promise.reject(error))
  }
}
