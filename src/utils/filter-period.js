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
 * Карта дат для селекта "Выбрать период" в фильтре
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
 * Вывод периода дат с форматированием
 * @param {string} dateFrom Дата в формате 2022-05-10
 * @param {string} dateTo Дата в формате 2022-05-01
 * @return String Дата, например, 1 — 7 мая 2022, 10 апр. — 10 мая 2022
 */
export function textRangePeriod (dateFrom, dateTo) {
  if (dateFrom === dateTo) {
    return dateF(Date.now(), { month: 'short' })
  }

  return `${getRangeDate(dateFrom)} — ${dateF(dateTo, { month: 'short' })}`
}
