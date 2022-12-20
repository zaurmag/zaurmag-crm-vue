<template>
  <div class="card-body p-lg-40">
    <h1 class="h4 text-center mb-25">Авторизация</h1>
    <auth-form />
    <div class="text-secondary fz-14 mt-4 text-center">
      <router-link class="text-decoration-none" to="/sign-up">Зарегистрируйтесь</router-link>,
      если нет учетной записи.
    </div>
  </div>
</template>

<script setup>
import AuthForm from '@/components/AuthForm.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { error } from '@/utils/error'
import { computed } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
const isAuth = computed(() => store.getters['auth/isAuthenticated'])
document.title = 'Вход в систему | Система подсчета доходв/расходов'

if (route.query.message && !isAuth.value) {
  store.dispatch('setMessage', {
    value: error(route.query.message),
    type: 'info'
  })
}

if (isAuth.value) {
  router.push({ name: 'home' })
}

// const redirectIsAuth = val => {
//   const auth = val || isAuth.value
//   if (auth && route.path === '/sign-in') {
//     router.push('/')
//   }
// }
//
// redirectIsAuth()
//
// watch(isAuth.value, val => {
//   redirectIsAuth(val)
// })
</script>
