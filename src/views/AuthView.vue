<template>
  <div class="card-body p-lg-40">
    <h1 class="h4 text-center mb-25">Авторизация</h1>
    <auth-form />
    <div class="text-secondary fz-14 mt-4 text-center">
      <router-link
        class="text-decoration-none"
        to="/sign-up"
      >
        Зарегистрируйтесь </router-link
      >, если нет учетной записи.
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthForm from '@/components/AuthForm.vue'
import { APP_NAME } from '@/config/consts'
import { error } from '@/utils/error'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const message: string = route.query.message as string
const isAuth: boolean = store.getters['auth/isAuthenticated']
document.title = `Вход в систему | ${APP_NAME}`

if (message) {
  store.dispatch('setMessage', {
    value: error(message),
    type: 'info'
  })
}

if (isAuth) {
  router.push({ name: 'Home' })
}
</script>
