import axios from '@/axios/dbase'
import store from '../../store'
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
        commit('auth/setToken', data, { root: true })
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
    },
    async changePassword ({ commit, dispatch }, { password }) {
      try {
        const idToken = store.getters['auth/token']
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.VUE_APP_FB_KEY}`
        await axios.post(url, {
          idToken,
          password,
          returnSecureToken: false
        }, {
          headers: {
            'X-Firebase-Locale': 'ru-RU'
          }
        })
        dispatch(
          'setMessage',
          { value: 'Пароль успешно изменен!', type: 'info' },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          { value: error(e.response.data.error.message), type: 'danger' },
          { root: true }
        )
        throw new Error()
      }
    },
    async deleteAccount ({ dispatch }) {
      try {
        const idToken = store.getters['auth/token']
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.VUE_APP_FB_KEY}`
        await axios.post(url, { idToken })
        dispatch('deleteUser')
      } catch (e) {
        dispatch(
          'setMessage',
          { value: error(e.response.data.error.message), type: 'danger' },
          { root: true }
        )
        throw new Error()
      }
    },
    async deleteUser ({ commit, dispatch, getters }) {
      try {
        const uID = getters.userID
        await axios.delete(`/users/${uID}.json`)
        await axios.delete(`/projects/${uID}.json`)

        dispatch(
          'setMessage',
          { value: 'Аккаунт успешно удален!', type: 'info' },
          { root: true }
        )

        commit('logout')
        commit('auth/logout', null, { root: true })
      } catch (e) {
        dispatch(
          'setMessage',
          { value: error(e.response.data.error.message), type: 'danger' },
          { root: true }
        )
        throw new Error()
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
