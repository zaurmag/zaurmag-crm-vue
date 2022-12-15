import store from '../../store'
import axios from '@/axios/dbase'
import { transform, transform2 } from '@/utils/transform'

export default {
  namespaced: true,
  state () {
    return {
      communal: [],
      rates: {}
    }
  },
  mutations: {
    setItems (state, data) {
      state.communal = data
    },
    setRates (state, data) {
      state.rates = data
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
    },
    async loadRates ({ commit, dispatch }) {
      try {
        const uID = store.getters['users/userID']
        const { data } = await axios.get(`/communal/rates/${uID}.json`)

        commit('setRates', transform2(data))
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
    async addRates ({ commit, dispatch }, payload) {
      try {
        const uID = store.getters['users/userID']
        await axios.post(`/communal/rates/${uID}.json`, {
          userId: uID,
          ...payload
        })

        dispatch(
          'setMessage',
          {
            type: 'success',
            value: 'Тарифы успешно сохранены!'
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
    },
    async updateRates ({ dispatch }, item) {
      try {
        const uID = store.getters['users/userID']
        const { data } = await axios.put(
          `/communal/rates/${uID}/${item.id}.json`,
          item
        )
        dispatch(
          'setMessage',
          {
            type: 'success',
            value: 'Тарифы успешно обновлены!'
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
    }
  },
  getters: {
    communal: state => state.communal.sort((a, b) => new Date(b.date) - new Date(a.date)),
    prevData: (_, getters) => getters.communal[0],
    rates: state => state.rates,
    trashCalc: (_, getters) => getters.rates.trash * getters.rates.people
  }
}
