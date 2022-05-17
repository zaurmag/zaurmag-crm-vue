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

/**
 * Карта дат для селекта Выбрать период в фильтре
 * @return Object
 * Example: {name: week, value: 2022-05-10}
 */
export function fpMap () {
  return options.reduce((acc, item) => {
    acc[item.value] = getPeriodLater(item.value, true)

    return acc
  }, {})
}

/**
 * Вывод период дат в выпадающем селекте произвольного периода фильтра
 * @param {string} period Период, например, week, month
 * @return String Дата, например, 1 — 7 мая 2022, 10 апр. — 10 мая 2022
 */
export function textRangePeriod (period) {
  const dateNow = dateF(Date.now(), { locale: 'fr-CA' })
  const periodLater = getPeriodLater(period)

  if (period === 'today') {
    return dateF(Date.now(), { month: 'short' })
  }

  return `${getRangeDate(periodLater)} — ${dateF(dateNow, { month: 'short' })}`
}

export function textRangePeriod2 (dateFrom, dateTo) {
  if (dateFrom === dateTo) {
    return dateF(Date.now(), { month: 'short' })
  }

  return `${getRangeDate(dateFrom)} — ${dateF(dateTo, { month: 'short' })}`
}
