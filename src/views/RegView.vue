<template>
  <div class="card-body p-lg-40">
    <h1 class="h4 text-center mb-25">Регистрация</h1>
    <register-form />
    <div class="text-secondary fz-14 mt-4 text-center">
      <router-link
        class="text-decoration-none"
        to="/sign-in"
      >
        Войдите
</router-link
      >, если вы уже зарегистрированы.
    </div>
  </div>
</template>

<script setup>
import RegisterForm from '@/components/RegisterForm.vue'
document.title = 'Регистрация пользователя | Система подсчета доходов/расходов'
</script>
