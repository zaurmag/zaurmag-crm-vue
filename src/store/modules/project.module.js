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
      const data = ''
      commit('setItems', data)
    },
    async loadOne (_, id) {

    },
    async add ({ commit, dispatch }, item) {
      dispatch('setMessage', {
        type: 'success',
        value: 'Запись успешно добавлена'
      }, { root: true })
      commit('clearMessage', { root: true })
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
