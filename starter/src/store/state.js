const state = {
  route: {
    name: null,
    path: null
  }
}

const actions = {
  setRoute ({ commit }, payload) {
    commit('set_route', payload)
  }
}

const mutations = {
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
