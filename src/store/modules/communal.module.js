import store from '../../store'
import axios from '@/axios/dbase'
import { transform, transform2 } from '@/utils/transform'

export default {
	namespaced: true,
	state() {
		return {
			communal: [],
			rates: {},
		}
	},
	mutations: {
		setItems(state, data) {
			state.communal = data
		},
		setRates(state, data) {
			state.rates = data
		},
	},
	actions: {
		async load({ commit, dispatch }) {
			try {
				const uID = store.getters['users/userID']
				const { data } = await axios.get(`/communal/${uID}.json`)
				commit('setItems', transform(data))
			} catch (e) {
				dispatch(
					'setMessage',
					{
						type: 'danger',
						value: e.message,
					},
					{ root: true }
				)

				throw e
			}
		},
		async loadOne ({ dispatch }, id) {
			try {
				const uID = store.getters['users/userID']
				const { data } = await axios.get(`/communal/${uID}/${id}.json`)
				return { ...data, id }
			} catch (e) {
				dispatch(
					'setMessage',
					{
						value: e.message,
						type: 'danger',
					},
					{ root: true }
				)

				throw e
			}
		},
		async add({ dispatch }, payload) {
			try {
				const uID = store.getters['users/userID']
				await axios.post(`/communal/${uID}.json`, {
					userId: uID,
					...payload,
				})

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

				throw e
			}
		},
		async delete({ dispatch }, id) {
			try {
				const uID = store.getters['users/userID']
				if (Array.isArray(id)) {
					for (const itemID of id) {
						await axios.delete(`/communal/${uID}/${itemID}.json`)
					}
				} else {
					await axios.delete(`/communal/${uID}/${id}.json`)
				}
				dispatch(
					'setMessage',
					{
						value: 'Запись успешна удалена',
						type: 'info',
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
				const uID = store.getters['users/userID']
				const { data } = await axios.patch(
					`/communal/${uID}/${item.id}.json`,
					item
				)
				dispatch(
					'setMessage',
					{
						type: 'info',
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
		async loadRates({ commit, dispatch }) {
			try {
				const uID = store.getters['users/userID']
				const { data } = await axios.get(`/communal/rates/${uID}.json`)

				commit('setRates', transform2(data))
			} catch (e) {
				dispatch(
					'setMessage',
					{
						type: 'danger',
						value: e.message,
					},
					{ root: true }
				)

				throw e
			}
		},
		async addRates({ dispatch }, payload) {
			try {
				const uID = store.getters['users/userID']
				await axios.post(`/communal/rates/${uID}.json`, {
					userId: uID,
					...payload,
				})

				dispatch(
					'setMessage',
					{
						type: 'success',
						value: 'Тарифы успешно сохранены!',
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

				throw e
			}
		},
		async updateRates({ dispatch }, item) {
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
						value: 'Тарифы успешно обновлены!',
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
	},
	getters: {
		communal: (state) =>
			state.communal.sort((a, b) => new Date(b.date) - new Date(a.date)),
		prevData: (_, getters) => getters.communal[0],
		rates: (state) => state.rates,
		communalById: (state, getters) => (id) =>
			getters.communal.find((c) => c.id === id),
	},
}
