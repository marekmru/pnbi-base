import Auth from '../Auth'
import CookieService from '../internal/cookie.service.js'
import router from '../internal/routes/index.js'

const state = {
  loading: false,
  title: 'CORE',
  profile: {
    cookie: CookieService.isPriPolCookieSet(),
    authenticated: false,
    name: null
  }
}

const actions = {
  fetchProfile ({ commit }, payload) {
    Auth.profile().then(profile => {
      const dto = {
        name: profile.name,
        realname: profile.realname,
        email: profile.email,
        short: profile.short,
        perm: profile.perm,
        role: profile.role
      }
      commit('set_profile', dto)
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
    // TODO check token
    return new Promise((resolve, reject) => {
      Auth.login(payload).then(result => {
        resolve(true)
        dispatch('gotoStart')
      }).catch(() => {
        commit('set_profile', { error: 'auth' })
        resolve(false)
      })
    })
  },
  logout ({ commit, dispatch }, payload) {
    // const next = () => dispatch('gotoLogin')
    Auth.logout().then(function () {
      dispatch('gotoLogin')
    }).catch(function () {
      dispatch('gotoLogin')
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
  }
}

const mutations = {
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
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
