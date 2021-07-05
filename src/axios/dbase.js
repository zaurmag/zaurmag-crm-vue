import axios from 'axios'
import store from '../store'
import router from '../router'

const dbtAxios = axios.create({
  baseURL: process.env.VUE_APP_DB_URL
})

dbtAxios.defaults.params = {}

dbtAxios.interceptors.request.use(async config => {
  if (!store.getters['auth/isAuthenticated']) {
    return config
  }

  if (store.getters['auth/isExpired']) {
    await store.dispatch('auth/refresh')
  }

  config.params.auth = store.getters['auth/token']

  return config
})

// Add a response interceptor
dbtAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    store.commit('auth/logout')
    router.push('/sign-in?message=auth')
  }

  return Promise.reject(error)
})

export default dbtAxios
