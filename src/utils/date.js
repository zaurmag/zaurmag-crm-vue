// Date format
export function dateF (date, locale = 'ru-RU', format = 'date') {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }

  if (format === 'datetime') {
    options.hour = '2-digit'
    options.minute = 'numeric'
    options.second = 'numeric'
  }

  return new Intl.DateTimeFormat(locale, options).format(new Date(date))
}

// Period days later
export function getPeriodLater (period) {
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

  return dateF(date, 'fr-CA', 'date')
}
