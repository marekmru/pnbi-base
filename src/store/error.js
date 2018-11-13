const state = {
  error: false
}

const actions = {
  showError ({ commit }, payload) {
    console.warn(payload)
  },
  hideError ({ commit, dispatch }) {

  }
}

const mutations = {
  show_error (state, payload) {
    state.error = payload
  },
  hide_error (state, payload) {
    state.error = false
  }
}

const getters = {
  error (state) {
    return state.error
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
