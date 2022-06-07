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
