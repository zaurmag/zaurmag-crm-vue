const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
  INVALID_PASSWORD: 'Неверный пароль',
  auth: 'Пожалуйста войдите в систему',
  admin: 'Для входа вам необходимы права администратора',
  EMAIL_EXISTS: 'Пользователь уже зарегистрирован в системе. Пожалуйста авторизуйтесь.'
}

export function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка!'
}
