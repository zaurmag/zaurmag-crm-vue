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

// Get date from period
export function getDateFromPeriod (period, format) {
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

export function getRangeDate (dateString) {
  if (!dateString) {
    throw new Error('Date is available!')
  }

  const date = new Date(dateString)
  const currentMonth = new Date().getMonth() + 1
  const currentYear = new Date().getFullYear()
  const month = date.getMonth()
  const year = date.getFullYear()
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

/**
 * Функция, возвращающая ярлык относительной даты
 * @param dateFrom Дата, например, 2022-05-10
 * @param dateTo Дата, например, 2022-05-01
 * @return String Относительная дата, например, today, yesterday, week, month, year
 */
export function relativeDate (dateFrom, dateTo) {
  const dateNow = Date.now()
  const getDay = date => new Date(date).getDate()
  const getMonth = date => new Date(date).getMonth() + 1
  const getYear = date => new Date(date).getFullYear()

  function checkPeriod (days) {
    if (days === 0) {
      return dateFrom === dateF(dateNow, { locale: 'fr-CA' })
    }

    if (days === 1 || days === 7) {
      return getDay(dateFrom) === getDay(dateNow) - days
    }

    return getDay(dateFrom) === getDay(dateNow) - days && getMonth(dateFrom) === getMonth(dateNow) && getYear(dateFrom) === getYear(dateNow)
  }

  console.log(getDay(dateFrom), getDay(dateNow))

  // Today
  if (checkPeriod(0)) {
    return 'today'
  }

  // Yesterday
  if (checkPeriod(1)) {
    return 'yesterday'
  }

  // Week
  if (checkPeriod(7)) {
    return 'week'
  }

  // Month
  if (getMonth(dateFrom) - 1 === getMonth(dateNow) - 1 && getDay(dateFrom) === getDay(dateNow)) {
    return 'month'
  }

  // Quarter
  if (checkPeriod(7)) {
    return 'quarter'
  }

  return ''
}
