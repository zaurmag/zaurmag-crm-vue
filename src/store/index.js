import { createStore } from 'vuex'
import project from './modules/project.module'

export default createStore({
  state: {
    message: null
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    clearMessage (state) {
      state.message = null
    }
  },
  actions: {
    setMessage ({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => commit('clearMessage'), 5000)
    }
  },
  modules: {
    project
  }
})
