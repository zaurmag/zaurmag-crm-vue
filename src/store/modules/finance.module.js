import store from '../../store'
import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'

export default {
  namespaced: true,
  state() {
    return {
      projects: []
    }
  },
  mutations: {
    setItems(state, data) {
      state.projects = data
    }
  },
  actions: {
    async load({ commit }) {
      try {
        const uID = store.getters['users/userID']
        const { data } = await axios.get(`/projects/${uID}.json`)
        commit('setItems', transform(data))
      } catch (e) {
        throw new Error(e)
      }
    },
    async loadOne(_, id) {
      try {
        const uID = store.getters['users/userID']
        const { data } = await axios.get(`/projects/${uID}/${id}.json`)
        return { ...data, id }
      } catch (e) {
        throw new Error(e)
      }
    },
    async add({ commit, dispatch }, item) {
      try {
        const uID = store.getters['users/userID']
        await axios.post(`/projects/${uID}.json`, item)
        dispatch(
          'setMessage',
          {
            type: 'success',
            value: 'Запись успешно добавлена'
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger'
          },
          { root: true }
        )
      }
    },
    async update({ dispatch }, item) {
      try {
        const uID = store.getters['users/userID']
        const { data } = await axios.put(`/projects/${uID}/${item.id}.json`, item)
        dispatch(
          'setMessage',
          {
            type: 'success',
            value: 'Запись успешно обновлена!'
          },
          { root: true }
        )

        return data
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger'
          },
          { root: true }
        )
      }
    },
    async delete({ dispatch }, id) {
      try {
        const uID = store.getters['users/userID']
        if (Array.isArray(id)) {
          for (const itemID of id) {
            await axios.delete(`/projects/${uID}/${itemID}.json`)
          }
        } else {
          await axios.delete(`/projects/${uID}/${id}.json`)
        }
        dispatch(
          'setMessage',
          {
            value: 'Запись успешна удалена',
            type: 'success'
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger'
          },
          { root: true }
        )
      }
    }
  },
  getters: {
    projects: state => state.projects.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
}
