import { currency } from '@/utils/currency'

export default {
  install(App) {
    const currencyF = (App.config.globalProperties.$currency = currency)

    App.provide('currency', currencyF)
  }
}
