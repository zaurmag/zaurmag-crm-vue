export default {
  install (App, options) {
    const currency = App.config.globalProperties.$currency = function (amount, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
      }).format(amount)
    }

    App.provide('currency', currency)
  }
}
