import axios from 'axios'
export default {
  getAll () {
    return axios.get(`${window.BI_BASE_CONFIG.API}/pro?extra=public,meta.client,meta.campaign,meta.description,goals.priority,goals.budget,goals.kpi,targetGroups.meta.title,targetGroups.meta.type,mediaChannels.type,dateRange.total,result.resultsetIds`)
      .then(result => result.data.result).catch(error => {
        return Promise.reject(error.response)
      })
  }
}
