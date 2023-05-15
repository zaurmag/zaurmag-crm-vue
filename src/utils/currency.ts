/**
 * Функция вывода суммы с символом рубля
 * @param amount Сумма
 * @param args Дополнительные аргументы в виде объекта
 * @return String Число с символом рубля
 */
export const currency = (amount: number, args: object): string => {
  // @ts-ignore
  return new Intl.NumberFormat(args?.locale || 'ru-RU', {
    style: 'currency',
    currency: 'RUB',
    ...args
  }).format(amount)
}
