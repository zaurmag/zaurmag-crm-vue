<template>
  <header class="card-header text-center">
    <h1 class="h3 mb-0">Авторизация</h1>
  </header>
  <div class="card-body p-lg-30">
    <form action="#">
      <div class="mb-3">
        <label class="form-label" for="email">E-mail</label>
        <input class="form-control form-control-lg" id="email" type="email" placeholder="email@address.com">
      </div>
      <div class="mb-3">
        <label class="form-label" for="password">Пароль</label>
        <div class="form__password">
          <input class="form-control form-control-lg" id="password" type="password"
                 placeholder="Не менее 6-ти знаков"><a class="form__password-toggle pass-toggle--js" href="#">
          <svg class="icon icon-eye">
            <use xlink:href="#eye"></use>
          </svg>
        </a>
        </div>
      </div>
      <button class="btn btn-primary btn-lg w-100" type="submit">Войти</button>
    </form>
    <div class="text-secondary fz-14 mt-4 text-center">
      <router-link class="text-decoration-none" to="/sign-up">Зарегистрируйтесь</router-link>,
      если у вас нет еще учетной записи.
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style scoped>

</style>
