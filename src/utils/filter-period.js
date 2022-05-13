import { dateF, getPeriodLater, getRangeDate } from '@/utils/date'

export const options = [
  {
    name: 'Сегодня',
    value: 'today'
  },
  {
    name: 'Вчера',
    value: 'yesterday'
  },
  {
    name: 'Неделя',
    value: 'week'
  },
  {
    name: 'Месяц',
    value: 'month'
  },
  {
    name: 'Квартал',
    value: 'quarter'
  },
  {
    name: 'Год',
    value: 'year'
  }
]

// Filter period map
export function fpMap () {
  return options.reduce((acc, item) => {
    acc[item.value] = getPeriodLater(item.value, true)

    return acc
  }, {})
}

// Text period in dropdown select
// Example: 9 - 12 мая 2022
export function textRangePeriod (period) {
  const dateNow = dateF(Date.now(), { locale: 'fr-CA' })
  const periodLater = getPeriodLater(period)

  if (period === 'today') {
    return dateF(Date.now(), { month: 'short' })
  }

  return `${getRangeDate(periodLater)} — ${dateF(dateNow, { month: 'short' })}`
}
