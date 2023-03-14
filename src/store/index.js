import { createStore, createLogger } from 'vuex'
import project from './modules/finance.module'
import auth from './modules/auth.module'
import users from './modules/users.module'
import upload from './modules/upload.module'
import communal from './modules/communal.module'

const plugins = []

if (import.meta.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export default createStore({
  plugins,
  state: {
    message: null,
    sidebar: false
  },
  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
    setSidebar(state, value) {
      state.sidebar = value
    }
  },
  actions: {
    setMessage({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => commit('clearMessage'), 5000)
    }
  },
  getters: {
    sidebar: state => state.sidebar
  },
  modules: {
    auth,
    project,
    users,
    upload,
    communal
  }
})
