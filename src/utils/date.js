// Date format
export function dateF (date, args = {}) {
  const baseOptions = {
    locale: 'ru-RU',
    format: 'date',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...args
  }

  const dateOptions = Object.keys(baseOptions).reduce((acc, key) => {
    if (key === 'year' || key === 'month' || key === 'day') {
      acc[key] = baseOptions[key]
    }

    return acc
  }, {})

  if (baseOptions.format === 'datetime') {
    dateOptions.hour = '2-digit'
    dateOptions.minute = 'numeric'
    dateOptions.second = 'numeric'
  }

  return new Intl.DateTimeFormat(args.locale, dateOptions)
    .format(new Date(date))
    .replace(/\s*г\./, '')
}

// Period days later
export function getPeriodLater (period, format) {
  const date = new Date()

  switch (period) {
    case 'yesterday':
      date.setDate(date.getDate() - 1)
      break

    case 'week':
      date.setDate(date.getDate() - 7)
      break

    case 'month':
      date.setMonth(date.getMonth() - 1)
      break

    case 'quarter':
      date.setMonth(date.getMonth() - 3)
      break

    case 'year':
      date.setFullYear(date.getFullYear() - 1)
  }

  if (format) {
    return dateF(date, {
      locale: 'fr-CA'
    })
  }

  return date
}

export function getRangeDate (date) {
  if (!date) {
    throw new Error('Date is available!')
  }

  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = new Date(date).getMonth()
  const year = new Date(date).getFullYear()
  let mm = ''
  let yy = ''

  function getMM () {
    return dateF(date.setMonth(month), { month: 'short' }).split(' ').slice(1, 2).join('')
  }

  if (month + 1 !== currentMonth) {
    mm = getMM()
  }

  if (year !== currentYear) {
    mm = getMM()
    yy = dateF(date.setFullYear(year)).split('.').splice(-1, 2).join('')
  }

  return date.getDate() + ' ' + mm + ' ' + yy
}
