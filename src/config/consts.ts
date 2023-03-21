export const APP_NAME: string = 'ZmCrm'
export const PERIOD_OPTIONS: Array<object> = [
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

export const TYPE_OPTIONS: object[] = [
  {
    name: 'Все',
    value: 'all'
  },
  {
    name: 'Приход',
    value: 'income'
  },
  {
    name: 'Расход',
    value: 'outcome'
  },
  {
    name: 'В ожидании',
    value: 'pending'
  }
]

export const STATUS_OPTIONS: object[] = [
  {
    name: 'Все',
    value: 'all'
  },
  {
    name: 'Оплачено',
    value: 'paid'
  },
  {
    name: 'Не оплачено',
    value: 'not-paid'
  }
]

export const MONTHS: string[] = [
  'Янв',
  'Фев',
  'Март',
  'Апр',
  'Май',
  'Июнь',
  'Июль',
  'Авг',
  'Сент',
  'Окт',
  'Ноя',
  'Дек'
]

// Users
export const USER_STATUS: object[] = [
  {
    name: 'Все',
    value: 'all'
  },
  {
    name: 'Активен',
    value: 'active'
  },
  {
    name: 'Не активен',
    value: 'inactive'
  }
]

export const PASS_MINLENGTH: number = 3
