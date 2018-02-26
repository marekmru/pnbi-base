import axios from 'axios'
import Auth from '@/pnbi-base/Auth'
import moment from 'moment'
import BI_BASE_CONFIG from '@/pnbi.base.config.js'

export default {
  uniqueProjectName (name) {
    return this.getAll().then(
      projects => {
        projects = projects.filter(
          val => {
            return val.data.meta.campaign === name
          }
        )
        return projects.length === 0
      }
    ).catch(error => Promise.reject(error))
    /*     const deferred = this.$q.defer();
    this._getAll().then(projects => {
      const labelExists = angular.isDefined(projects.find(project => {
        return project.data.meta.campaign === name;
      }));
      const activeId = this.getActivePId();
      if (angular.isUndefined(activeId)) {
        deferred.resolve();
      }
      const idExists = angular.isDefined(projects.find(project => {
        return project._id === activeId && labelExists;
      }));
      const nameOk = name && name.length >= 5;
      const ok = (nameOk && labelExists && idExists) || (nameOk && !labelExists);
      if (ok) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    });
    return deferred.promise; */
  },
  duplicate (pid) {
    const call = this.getById(pid)
      .then(result => result)
      .catch(error => Promise.reject(error.response))
    const call2 = Auth.profile().then(profile => profile)
    return Promise.all([call, call2]).then(responses => {
      const profile = responses[1]
      const project = {
        data: Object.assign({}, responses[0].data)
      }
      const meta = project.data.meta
      const rand = `${moment(new Date()).format('LLL')}`
      const sec = `${new Date().getSeconds()}`
      meta.campaign = `${meta.campaign} (${rand}:${sec})`
      meta.description = meta.description || ''
      return this.post(project)
        .then(result => {
          return this._transformToOverview(result, profile)
        })
        .catch(error => Promise.reject(error.response))
    })
  },
  post (project) {
    project.label = project.data.meta.campaign || Math.random().toString()
    return axios
      .post(`${BI_BASE_CONFIG.API}/pro`, project)
      .then(result => {
        this.latestEtag = result.data.result.etag
        return result.data.result
      })
      .catch(error => Promise.reject(error.response))
  },
  delete (pid) {
    const call = this.getById(pid)
      .then(result => result)
      .catch(error => Promise.reject(error.response))

    return Promise.all([call]).then(responses => {
      const etag = responses[0].etag
      return axios
        .delete(`${BI_BASE_CONFIG.API}/pro/${pid}/${etag}`)
        .then(result => {
          return result.data.result
        })
        .catch(error => Promise.reject(error.response))
    })
  },
  put (project) {
    Object.assign(project, {
      etag: this.latestEtag
    })
    return axios
      .put(`${BI_BASE_CONFIG.API}/pro/${project._id}`, project)
      .then(result => {
        this.latestEtag = result.data.result.etag
        return result.data.result
      })
      .catch(error => Promise.reject(error.response))
  },

  togglePublic (pid) {
    const call = this.getById(pid)
      .then(result => result)
      .catch(error => Promise.reject(error.response))
    return Promise.all([call]).then(responses => {
      const project = responses[0]
      project.data.public = !project.data.public
      return this.put(project)
    })
  },
  getById (id) {
    const call = axios
      .get(`${BI_BASE_CONFIG.API}/pro/${id}`)
      .then(result => {
        return result.data.result
      })
      .catch(error => Promise.reject(error.response))
    return Promise.all([call]).then(responses => {
      const proj = responses[0]
      return Auth.profile().then(profile => {
        this.latestEtag = proj.etag
        proj.data.protected =
          proj.data.public && profile.username !== proj.author
        return proj
      })
    })
  },
  getAll () {
    const call = axios
      .get(
        `${
          BI_BASE_CONFIG.API
        }/pro?extra=public,meta.client,meta.campaign,meta.description,goals.priority,goals.budget,goals.kpi,targetGroups.meta.title,targetGroups.meta.type,mediaChannels.type,dateRange.total,result.resultsetIds`
      )
      .then(result => {
        return result.data.result
      })
      .catch(error => Promise.reject(error.response))
    return Promise.all([call]).then(responses => {
      const projects = responses[0]
      return Auth.profile().then(profile => {
        const ret = projects.map(proj => {
          return this._transformToOverview(proj, profile)
        })
        return ret
      })
    })
  },
  _transformToOverview (proj, profile) {
    proj.data.protected = proj.data.public && profile.username !== proj.author
    proj.data.mediaChannels = proj.data.mediaChannels.reduce(
      (total, amount) => {
        return isNaN(total) ? 0 : total + 1
      }
    )
    proj.data.targetGroups = proj.data.targetGroups
      .filter(tg => tg.meta.type !== 'NA')
      .map(tg => {
        if (tg.meta.type === 'F') {
          tg.meta.type = 'star'
        } else {
          /* if (tg.meta.type === 'C') */ tg.meta.type = 'compare_arrows'
        }
        return tg
      })
    try {
      const date1 = moment(proj.data.dateRange.total[0] * 1000)
        .format('YYYY/ww')
        .replace('/', '/W')
      const date2 = moment(proj.data.dateRange.total[1] * 1000)
        .format('YYYY/ww')
        .replace('/', '/W')
      proj.data.dateRange = `${date1} - ${date2}`
    } catch (err) {
      proj.data.dateRange = '∞'
    }
    const date3 = moment(proj.timestamp).format('DD.MM.YYYY H:mm')
    proj.about = `${date3} - ${proj.author}`
    return proj
  }
}
