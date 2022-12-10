import store from '../../store'
import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'

export default {
  namespaced: true,
  state () {
    return {
      communal: []
    }
  },
  mutations: {
    setItems (state, data) {
      state.communal = data
    }
  },
  actions: {
    async load ({ commit, dispatch }) {
      try {
        const uID = store.getters['users/userID']
        const { data } = await axios.get(`/communal/${uID}.json`)
        commit('setItems', transform(data))
      } catch (e) {
        dispatch(
          'setMessage',
          {
            type: 'danger',
            value: e.message
          },
          { root: true }
        )

        throw e
      }
    },
    async add ({ commit, dispatch }, payload) {
      try {
        const uID = store.getters['users/userID']
        await axios.post(`/communal/${uID}.json`, {
          userId: uID,
          ...payload
        })

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

        throw e
      }
    }
  },
  getters: {
    communal: state => state.communal.sort((a, b) => new Date(b.date) - new Date(a.date)),
    prevData: (_, getters) => getters.communal[0]
  }
}
