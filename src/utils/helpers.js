/**
 * Проверка на существование ключей у объекта
 * @param object Проверяемый объект
 * @return Number Количество ключей объекта
 */
export const isHasKeysObject = object => {
  return Object.keys(object).length
}
