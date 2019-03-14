import Auth from '../Auth'
import bus from '../event-bus.js'
import CookieService from '../internal/cookie.service.js'
import router from '../internal/routes/index.js'
import { axiosInternal } from '../internal/axios.config.js'

const state = {
  hasOwnTheme: false,
  loading: false,
  dark: false,
  title: 'CORE',
  notification: null,

  profile: {
    error: null,
    cookie: CookieService.isPriPolCookieSet(),
    authenticated: false,
    name: null,
    email: 'No email',
    short: 'NA'
  }
}

const actions = {
  showNotification ({ commit }, payload) {
    bus.$emit('SHOW_NOTIFICATION', payload)
  },
  fetchProfile ({ commit, dispatch }, payload) {
    const promiseProfile = Auth.profile()
    const promiseSetting = Auth.setting()
    Promise.all([promiseProfile, promiseSetting])
      .then(data => {
        const profile = data[0]
        const setting = data[1]
        const dto = {
          name: profile.name,
          realname: profile.realname,
          email: profile.email,
          short: profile.short,
          perm: profile.perm,
          role: profile.role
        }
        commit('set_profile', dto)
        commit('set_dark', setting)

        if (router.instance.history.current.name === 'login') {
          dispatch('gotoStart')
        }
      }, () => {
        // commit('set_profile', { error: 'auth' })
      })
  },
  gotoStart ({ commit, dispatch }) {
    commit('clear_auth_error')
    commit('set_profile', { authenticated: true })
    dispatch('fetchProfile')
    router.instance.push('/')
  },
  gotoLogin ({ commit }) {
    window.localStorage.clear()
    commit('clear_profile')
    router.instance.push('/login')
  },
  checkLogin ({ commit, dispatch }, payload) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user != null) {
      Auth.login(user).then(val => {
        dispatch('gotoStart')
      }).catch(() => {
        dispatch('gotoLogin')
        commit('set_profile', { error: 'auth' })
      })
    }
  },
  login ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      Auth.login(payload).then(result => {
        resolve(true)
        dispatch('gotoStart')
      }, () => {
        reject(new Error('LoginError'))
        commit('set_profile', { error: 'auth' })
      })
    })
  },
  logout ({ commit, dispatch }, payload) {
    Auth.logout().then(function () {
      dispatch('gotoLogin')
    }).catch((err) => {
      dispatch('gotoLogin')
      return Promise.reject(err)
    })
  },
  clearAuthError ({ commit }) {
    commit('clear_auth_error')
  },
  setLoading ({ commit }, payload) {
    commit('set_loading', payload)
  },
  setTitle ({ commit }, payload) {
    commit('set_title', payload)
    document.title = payload
  },
  initializeApp ({ commit, dispatch }, payload) {
    dispatch('setTitle', payload.TITLE)
    if (payload.DARK != null) {
      state.hasOwnTheme = true // do not show theme switch
      commit('set_dark', { dark: payload.DARK })
    }
  },
  setDark ({ commit }, payload) {
    return axiosInternal
      .post('/setting/_general', { data: { dark: payload } })
      .then(result => {
        commit('set_dark', payload)
      })
      .catch(error => Promise.reject(error))
  }
}

const mutations = {
  set_notification (state, payload) {
    state.notification = payload
  },
  set_dark (state, payload) {
    if (payload.dark != null) {
      state.dark = payload.dark
    }
  },
  clear_auth_error () {
    delete state.profile.error
  },
  set_profile (state, payload) {
    if (payload.authenticated === true) {
      delete state.profile.error
    }
    state.profile = Object.assign({}, state.profile, payload)
  },
  clear_profile (state, payload) {
    state.profile = {
      cookie: CookieService.isPriPolCookieSet(),
      authenticated: false,
      name: null
    }
  },
  set_loading (state, payload) {
    state.loading = payload
  },
  set_title (state, payload) {
    state.title = payload
  },
  initialize_app (state, payload) {
    state.title = payload.title
  }
}

const getters = {
  profile (state) {
    return state.profile
  },
  loading (state) {
    return state.loading
  },
  title (state) {
    return state.title
  },
  dark (state) {
    return state.dark
  },
  hasOwnTheme (state) {
    return state.hasOwnTheme
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
