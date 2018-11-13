import axios from 'axios'
import debug from './$debug'
import iHelper from './internal/$internal'
/* const api = () => {
  return Vue.prototype.$store.getters.api
} */
export default {
  login (user) {
    return axios
      .post('/login', user)
      .then(result => {
        window.localStorage.setItem('user', JSON.stringify(result.data))
        return result.data
      })
      .catch(error => Promise.reject(error))
    /*     return Promise.all([login]).then(() => {
      return this.profile()
    }) */
  },
  profile () {
    if (this.$profile != null) {
      return Promise.resolve(this.$profile)
    }
    return axios
      .get(`/profile`)
      .then(result => {
        /*         const rn = result.data.result.realname
        let short = null
        if (rn.includes(' ')) {
          short = rn.split(' ').map(val => val.charAt(0).toUpperCase()).join('')
        } else {
          short = rn.substring(0, 1)
        } */
        this.$profile = Object.assign(result.data, {
          short: iHelper.shortName(result.data.realname)
        })
        // EventBus.$emit(PROFILE_UPDATED, this.$profile)
        return this.$profile
      })
      .catch(error => Promise.reject(error))
  },
  logout () {
    /*     EventBus.$emit(PROFILE_UPDATED, undefined)
    this.$profile = undefined */
    return axios
      .get(`/logout`)
      .then(result => {
        return result.data
      })
      .catch(error => Promise.reject(error))
  },
  password (password) {
    return debug.notImplemented('password')
    /*     return axios
      .post(`https://bi.plan-net.com/api/v2/password`, password)
      .then(result => result.data.result)
      .catch(error => Promise.reject(error)) */
  },
  reset (data) {
    // resetten mit token und neuem passwort
    if (data.token != null) {
      return axios
        .post(`/login`, data)
        .then(result => result.data)
        .catch(error => Promise.reject(error))
    }
    // anfordern mit email
    return axios
      .put(`/login`, data)
      // .put(`/login?email=${data.email}`)
      .then(result => result)
      .catch(error => Promise.reject(error))
  }
}
