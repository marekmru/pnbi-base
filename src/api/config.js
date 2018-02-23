import axios from 'axios'
export default {
  getConfig () {
    return axios
      .get('../static/config.v2.json')
      .then(result => {
        return result.data
      })
      .catch(error => Promise.reject(error.response))
  }
}
