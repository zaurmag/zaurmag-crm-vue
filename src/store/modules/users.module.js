import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'
import { error } from '@/utils/error'
import { dateF } from '@/utils/date'
const USER_CURRENT_KEY = 'crm-current-user'
const USERS_KEY = 'crm-users'

export default {
  namespaced: true,
  state () {
    return {
      currentUser: JSON.parse(localStorage.getItem(USER_CURRENT_KEY)) ?? {},
      users: JSON.parse(localStorage.getItem(USERS_KEY)) ?? []
    }
  },
  mutations: {
    setUsers (state, users) {
      state.users = users
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    },
    setUser (state, user) {
      state.currentUser = user
      localStorage.setItem(USER_CURRENT_KEY, JSON.stringify(user))
    },
    updateCurrentUser (state, data) {
      const user = JSON.parse(localStorage.getItem(USER_CURRENT_KEY))

      state.currentUser = {
        ...user,
        ...data
      }
    },
    setUserById (state, data) {
      const user = state.users.find(user => user.id === data.id)
      const idx = state.users.findIndex(u => u.id === data.id)
      state.users[idx] = {
        ...user,
        ...data
      }
      localStorage.setItem(USERS_KEY, JSON.stringify(state.users))
    },
    logout (state) {
      state.currentUser = {}
      state.users = []
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
        dateRegister: dateF(new Date(), { locale: 'sv-SE' }),
        role: 'user'
      })
      commit('setUser', { ...data, id: localId })
      dispatch(
        'setMessage',
        { value: 'Регистрация прошла успешно', type: 'success' },
        { root: true }
      )
    },
    async update ({ commit, dispatch, getters }, payload) {
      const { data } = await axios.patch(`/users/${payload.id}.json`, payload)
      if (payload.id === getters.user.id) {
        commit('updateCurrentUser', data)
        commit('setUserById', data)
      } else {
        commit('setUserById', data)
      }
      dispatch(
        'setMessage',
        { value: 'Информация успешно обновлена!', type: 'success' },
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
    isAdmin: state => state.currentUser.role === 'admin',
    user: state => state.currentUser,
    userID: (_, getters) => getters.user.id,
    userById: (state, getters) => id => getters.users.find(user => user.id === id)
  }
}
