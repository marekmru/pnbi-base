import axios from 'axios'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'
const PATH = `${BI_BASE_CONFIG.API}`

export default {
  getFilter () {
    return axios
      .get(`${PATH}/filter`)
      .then(result => {
        return result.data.result
      })
      .catch(error => Promise.reject(error.response))
  },
  getMap (filter) {
    const postbody = {
      start: filter.date.start,
      end: filter.date.end,
      VkStBTR: filter.type,
      Bundesland: filter.state
    }
    return axios
      .post(`${PATH}/map`, postbody)
      .then(result => {
        return result.data.result.data
      })
      .catch(error => Promise.reject(error.response))
  },
  getKpi (filter) {
    const postbody = {
      start: filter.date.start,
      end: filter.date.end,
      VkStBTR: filter.type,
      Bundesland: filter.state
    }
    return axios
      .post(`${PATH}/kpi`, postbody)
      .then(result => {
        return result.data.result
      })
      .catch(error => Promise.reject(error.response))
  }
}
