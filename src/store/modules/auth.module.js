import axios from '@/axios/dbase'
import { error } from '@/utils/error'
const JWT_TOKEN = 'jwt-token'
const JWT_REFRESH_TOKEN = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USER_KEY = 'crm-user'

export default {
  namespaced: true,
  state () {
    return {
      token: localStorage.getItem(JWT_TOKEN),
      refreshToken: localStorage.getItem(JWT_REFRESH_TOKEN),
      expiresDate: new Date(localStorage.getItem(EXPIRES_KEY))
    }
  },
  mutations: {
    setToken (state, { refreshToken, idToken, expiresIn = '3600' }) {
      const expiresDate = new Date(
        new Date().getTime() + Number(expiresIn) * 1000
      )
      state.token = idToken
      state.refreshToken = refreshToken
      state.expiresDate = expiresDate
      localStorage.setItem(JWT_TOKEN, idToken)
      localStorage.setItem(JWT_REFRESH_TOKEN, refreshToken)
      localStorage.setItem(EXPIRES_KEY, expiresDate.toString())
    },
    logout (state) {
      state.token = null
      state.refreshToken = null
      state.expiresDate = null
      localStorage.removeItem(JWT_TOKEN)
      localStorage.removeItem(JWT_REFRESH_TOKEN)
      localStorage.removeItem(EXPIRES_KEY)
      localStorage.removeItem(USER_KEY)
    }
  },
  actions: {
    async login ({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_APP_FB_KEY}`
        const { data } = await axios.post(url, {
          ...payload,
          returnSecureToken: true
        })
        commit('setToken', data)
        commit('clearMessage', null, { root: true })
        await dispatch('users/getUser', data.localId, { root: true })
      } catch (e) {
        dispatch(
          'setMessage',
          { value: error(e.response.data.error.message), type: 'danger' },
          { root: true }
        )
        throw new Error()
      }
    },
    async refresh ({ state, commit }) {
      try {
        const { data } = await axios.post(
          `https://securetoken.googleapis.com/v1/token?key=${import.meta.env.VITE_APP_FB_KEY}`,
          {
            grand_type: 'refresh_token',
            refresh_token: state.refreshToken
          }
        )

        commit('setToken', {
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiredIn: data.expires_in
        })
      } catch (e) {
        console.error('Error:', e.message)
      }
    },
    logout ({ commit }) {
      commit('logout')
      commit('users/logout', null, { root: true })
    }
  },
  getters: {
    token: state => state.token,
    isAuthenticated: (_, getters) => !!getters.token && !getters.isExpired,
    isExpired: state => new Date() >= state.expiresDate
  }
}
