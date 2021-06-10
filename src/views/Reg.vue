<template>
  <header class="card-header text-center">
    <h1 class="h3 mb-0">Регистрация пользователя</h1>
  </header>
  <div class="card-body p-lg-30">
    <form action="#">
      <div class="mb-3">
        <label class="form-label" for="name">Ваше имя</label>
        <input class="form-control form-control-lg" id="name" type="text" placeholder="Например, Иван">
      </div>
      <div class="mb-3">
        <label class="form-label" for="email">Ваш E-mail</label>
        <input class="form-control form-control-lg" id="email" type="email" placeholder="email@address.com">
      </div>
      <div class="mb-3">
        <label class="form-label" for="password">Пароль</label>
        <div class="form__password">
          <input class="form-control form-control-lg" id="password" type="password" placeholder="Не менее 6-ти знаков"><a class="form__password-toggle pass-toggle--js" href="#">
          <svg class="icon icon-eye">
            <use xlink:href="#eye"></use>
          </svg></a>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="password2">Подтвердите пароль</label>
        <div class="form__password">
          <input class="form-control form-control-lg" id="password2" type="password" placeholder="Не менее 6-ти знаков"><a class="form__password-toggle pass-toggle--js" href="#">
          <svg class="icon icon-eye">
            <use xlink:href="#eye"></use>
          </svg></a>
        </div>
      </div>
      <button class="btn btn-primary btn-lg w-100" type="submit">Создать аккаунт</button>
    </form>
    <div class="text-secondary fz-14 mt-4 text-center">
      <router-link class="text-decoration-none" to="/sign-in">Войдите</router-link>,
      если вы уже зарегистрированы.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg'
}
</script>

<style scoped>

</style>
