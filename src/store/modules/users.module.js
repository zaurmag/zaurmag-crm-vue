import axios from '@/axios/dbase'
import { transform } from '@/utils/transform'

export default {
  namespaced: true,
  state () {
    return {
      users: []
    }
  },
  mutations: {
    setUsers (state, users) {
      state.users = users
    }
  },
  actions: {
    async load ({ commit }) {
      const { data } = await axios.get('/users.json')
      commit('setUsers', transform(data))
    }
  },
  getters: {
    users: state => state.users
  }
}
