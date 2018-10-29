import axios from 'axios'
import EventBus, {
  PROFILE_UPDATED
} from './event-bus'
export function unwrap (object) {
  if (object.data.result.message != null) {
    return object.data.result.message
  }
  return object.data
}
let config = null
export function setApiConfig (cnf) {
  config = cnf
}
export default {
  login (user) {
    return axios
      .post(`${config.API}/login`, user)
      .then(result => {
        console.log(result.data)
        window.localStorage.setItem('user', JSON.stringify(result.data.data))
        return result.data.result
      })
      .catch(error => Promise.reject(error.response))
    /*     return Promise.all([login]).then(() => {
      return this.profile()
    }) */
  },
  logout () {
    EventBus.$emit(PROFILE_UPDATED, undefined)
    this._profile = undefined
    return axios
      .get(`${config.API}/logout`)
      .then(result => {
        return result.data.result
      })
      .catch(error => Promise.reject(error.response))
  },
  profile () {
    if (this._profile != null) {
      return Promise.resolve(this._profile)
    }
    return axios
      .get(`${config.API}/profile`)
      .then(result => {
        const rn = result.data.result.realname
        let short = null
        if (rn.includes(' ')) {
          short = rn.split(' ').map(val => val.charAt(0).toUpperCase()).join('')
        } else {
          short = rn.substring(0, 1)
        }
        this._profile = Object.assign(result.data.result, {
          short
        })
        EventBus.$emit(PROFILE_UPDATED, this._profile)
        return this._profile
      })
      .catch(error => Promise.reject(error.response))
  },
  password (password) {
    return axios
      .post(`https://bi.plan-net.com/api/v2/password`, password)
      .then(result => result.data.result)
      .catch(error => Promise.reject(error.response))
  },
  reset (data) {
    if (data.password_code) {
      return axios
        .post(`${config.API}/reset`, data)
        .then(result => result)
        .catch(error => Promise.reject(error.response))
    }
    return axios
      .get(`${config.API}/reset?email=${data.email}`)
      .then(result => result)
      .catch(error => Promise.reject(error.response))
  }
}
