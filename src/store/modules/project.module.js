/* eslint-disable */

import store from '../../store'
import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'

export default {
  namespaced: true,
  state () {
    return {
      projects: []
    }
  },
  mutations: {
    setItems (state, data) {
      state.projects = data
    }
  },
  actions: {
    async load ({ commit }) {
      try {
        const uID = store.getters['auth/userID']
        const { data } = await axios.get(`/users/${uID}/projects.json`)
        commit('setItems', transform(data))
      } catch (e) {
        throw e
      }
    },
    async loadOne (_, id) {
      try {
        const uID = store.getters['auth/userID']
        const { data } = await axios.get(`/users/${uID}/projects/${id}.json/`)
        return { ...data, id }
      } catch (e) {
        throw e
      }
    },
    async add ({ commit, dispatch }, item) {
      try {
        const uID = store.getters['auth/userID']
        await axios.post(`/users/${uID}/projects.json`, item)
        dispatch('setMessage', {
          type: 'success',
          value: 'Запись успешно добавлена'
        }, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    },
    async update ({ dispatch }, id) {

    },
    async delete ({ dispatch }, id) {

    }
  },
  getters: {
    projects: state => state.projects
  }
}
