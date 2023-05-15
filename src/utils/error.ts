enum errorCodes {
  EMAIL_NOT_FOUND = 'Пользователь с таким email не был найден',
  INVALID_PASSWORD = 'Неверный пароль',
  EMAIL_EXISTS = 'Пользователь уже зарегистрирован в системе. Пожалуйста авторизуйтесь.',
  auth = 'Пожалуйста войдите в систему',
  admin = 'Для входа вам необходимы права администратора'
}

export const error = (code: errorCodes): string =>
  errorCodes[code] ? errorCodes[code] : 'Неизвестная ошибка!'

// TODO: remove comments after success working
// const ERROR_CODES = {
//   EMAIL_NOT_FOUND: 'Пользователь с таким email не был найден',
//   INVALID_PASSWORD: 'Неверный пароль',
//   EMAIL_EXISTS: 'Пользователь уже зарегистрирован в системе. Пожалуйста авторизуйтесь.',
//   auth: 'Пожалуйста войдите в систему',
//   admin: 'Для входа вам необходимы права администратора'
// }
