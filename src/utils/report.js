import { getMonth } from '@/utils/date'

/**
 * Get summ amount in items
 */

export const getSumm = items => {
  return items.reduce((acc, item) => {
    acc += +item.amount

    return acc
  }, 0)
}

/**
 * Get summ amount in filter items
 */
export const getAmountSumm = (type, projects) => {
  const itemsType = projects.filter((item) => item.type === type)

  return getSumm(itemsType)
}

/**
 * Get progress value
 * @param value Текущее значение
 * @param total Общая сумма
 * @return String В формате number + %, например - 95%
 */
export const progress = (value, total) => {
  return Math.round((value / total) * 100) + '%'
}

/**
 * Функция, которая возвращает массив сумм за определенные месяцы
 * @param {Array} arrayProjects Массив проектов
 * @param {Array} months Массив месяцев
 * @return {Array} Массив сумм
 */
export const getAmountByMonths = (arrayProjects, months) => {
  const map = {}

  arrayProjects.forEach((el) => {
    const dateMonth = getMonth(el.date)

    if (map[dateMonth]) {
      map[dateMonth] += +el.amount
    } else {
      map[dateMonth] = +el.amount
    }
  })

  return months
    .map((month, idx) => map[idx + 1])
    .filter(item => item)
}

/**
 * Функция, которая возвращает отсортированный массив месяцев из переданного массива проектов
 * @param {Array} items Массив проектов
 * @param {Array} months Массив месяцев в коротком формате
 * @return {Array} Массив строк месяцев
 */

export const getMonthName = (items, months) => {
  const monthsMap = months.reduce((acc, el, idx) => {
    acc.push({
      name: el,
      index: idx + 1
    })

    return acc
  }, [])

  const result = items
    .map((item) => monthsMap[getMonth(item.date) - 1])
    .sort((a, b) => a.index - b.index)
    .map((item) => item.name)

  return [...new Set(result)]
}
