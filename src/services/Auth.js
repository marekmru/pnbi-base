// import Vue from 'vue'
import axios from 'axios'

export default {
  login (user) {
    return axios.post(`${window.BI_BASE_CONFIG.API}/login2`, user)
      .then(result => {
        return result
      }).catch(error => {
        return Promise.reject(error.response)
      })
  },
  logout () {
    // return Vue.http.get(`${window.BI_BASE_CONFIG.API}/logout`)
    return axios.get(`${window.BI_BASE_CONFIG.API}/logout`)
  },

  profile () {
    return axios.get(`${window.BI_BASE_CONFIG.API}/profile`).then(result => {
      return result
    }).catch(error => {
      return Promise.reject(error.response)
    })
  },
  reset (data) {
    /*     if (data.email) {
      return Promise.reject('Error: no email.')
    } */
    if (data.password_code) {
      return axios.post(`${window.BI_BASE_CONFIG.API}/reset`, data)
        .then(result => {
          return result
        }).catch(error => {
          return Promise.reject(error.response)
        })
    }
    return axios.get(`${window.BI_BASE_CONFIG.API}/reset?email=${data.email}`)
  }
}
