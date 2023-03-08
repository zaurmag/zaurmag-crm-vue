import { dateF, getDateFromPeriod, getRangeDate } from '@/utils/date'
import { PERIOD_OPTIONS } from '@/config/consts'

/**
 * Карта дат для селекта "Выбрать период" в фильтре
 * @return Object
 * Example: {name: week, value: 2022-05-10}
 */
export function fpMap() {
  return PERIOD_OPTIONS.reduce((acc, item) => {
    acc[item.value] = getDateFromPeriod(item.value, true)

    return acc
  }, {})
}

/**
 * Вывод периода дат с форматированием
 * @param {string} dateFrom Дата в формате 2022-05-10
 * @param {string} dateTo Дата в формате 2022-05-01
 * @return String Дата, например, 1 — 7 мая 2022, 10 апр. — 10 мая 2022
 */
export function textRangePeriod(dateFrom, dateTo) {
  if (dateFrom === dateTo) {
    return dateF(Date.now(), { month: 'short' })
  }

  return `${getRangeDate(dateFrom)} — ${dateF(dateTo, { month: 'short' })}`
}
