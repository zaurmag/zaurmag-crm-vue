export const currency = (amount, args) => {
  return new Intl.NumberFormat(args?.locale || 'ru-RU', {
    style: 'currency',
    currency: 'RUB',
    ...args
  }).format(amount)
}
