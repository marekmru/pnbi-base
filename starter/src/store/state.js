import EventBus from 'pnbi-base/src/event-bus'

const state = {
  loading: true,
  route: {
    name: null,
    path: null
  }
}

const actions = {
  setRoute ({ commit }, payload) {
    commit('set_route', payload)
  },
  setLoader ({ commit }, payload) {
    commit('set_loader', payload)
  }
}

const mutations = {
  set_loader (state, payload) {
    state.loading = payload
    EventBus.$emit('LOADING', payload)
  },

  set_route (state, route) {
    state.route = route
  }
}

const getters = {

}

export default {
  state,
  actions,
  mutations,
  getters
}
