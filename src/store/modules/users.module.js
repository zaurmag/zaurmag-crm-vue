import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'
import { error } from '@/utils/error'
const USER_KEY = 'crm-user'

export default {
  namespaced: true,
  state () {
    return {
      user: JSON.parse(localStorage.getItem(USER_KEY)) ?? {},
      users: []
    }
  },
  mutations: {
    setUsers (state, users) {
      state.users = users
    },
    setUser (state, user) {
      state.user = user
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    logout (state) {
      state.user = {}
    }
  },
  actions: {
    async load ({ commit }) {
      const { data } = await axios.get('/users.json')
      commit('setUsers', transform(data))
    },
    async signUp ({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true
        })
        commit('setToken', data)
        await dispatch('createUser', {
          ...data,
          name: payload.name
        })
      } catch (e) {
        dispatch(
          'setMessage',
          { value: error(e.response.data.error.message), type: 'danger' },
          { root: true }
        )
        throw new Error()
      }
    },
    async createUser ({ commit, dispatch }, { name, email, localId }) {
      const { data } = await axios.put(`/users/${localId}.json`, {
        name,
        email,
        role: 'user'
      })
      commit('setUser', { ...data, id: localId })
      dispatch(
        'setMessage',
        { value: 'Регистрация прошла успешно', type: 'success' },
        { root: true }
      )
    },
    async getUser ({ commit, dispatch }, id) {
      try {
        const { data } = await axios.get(`/users/${id}.json`)
        commit('setUser', { ...data, id })
        commit('clearMessage', null, { root: true })
      } catch (e) {
        console.error(e.message)
      }
    }
  },
  getters: {
    users: state => state.users,
    isUser: (_, getters) => !getters.isAdmin,
    isAdmin: state => state.user.role === 'admin',
    user: state => state.user,
    userID: (_, getters) => getters.user.id
  }
}
