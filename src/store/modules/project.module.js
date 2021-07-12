/* eslint-disable */

import store from '../../store'
import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'

export default {
  namespaced: true,
  state() {
    return {
      projects: [],
    }
  },
  mutations: {
    setItems(state, data) {
      state.projects = data
    },
  },
  actions: {
    async load({ commit }) {
      try {
        const uID = store.getters['auth/userID']
        const { data } = await axios.get(`/users/${uID}/projects.json`)
        commit('setItems', transform(data))
      } catch (e) {
        throw e
      }
    },
    async loadOne(_, id) {
      try {
        const uID = store.getters['auth/userID']
        const { data } = await axios.get(`/users/${uID}/projects/${id}.json/`)
        return { ...data, id }
      } catch (e) {
        throw e
      }
    },
    async add({ commit, dispatch }, item) {
      try {
        const uID = store.getters['auth/userID']
        await axios.post(`/users/${uID}/projects.json`, item)
        dispatch(
          'setMessage',
          {
            type: 'success',
            value: 'Запись успешно добавлена',
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
    async update({ dispatch }, item) {
      try {
        const uID = store.getters['auth/userID']
        const { data } = await axios.put(
          `/users/${uID}/projects/${item.id}.json`,
          item
        )
        dispatch(
          'setMessage',
          {
            type: 'success',
            value: 'Запись успешно обновлена!',
          },
          { root: true }
        )

        return data
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
    async delete({ dispatch }, id) {
      try {
        const uID = store.getters['auth/userID']
        const ids = Array.isArray(id) ? id.join(';') : id
        await axios.delete(`/users/${uID}/projects/${ids}.json`)
        dispatch(
          'setMessage',
          {
            value: 'Запись успешна удалена',
            type: 'success',
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
  },
  getters: {
    projects: state => state.projects,
  },
}
