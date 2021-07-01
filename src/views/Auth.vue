<template>
  <app-page>
    <header class="card-header text-center">
      <h1 class="h3 mb-0">Авторизация</h1>
    </header>
    <div class="card-body p-lg-30">
      <auth-form />
      <div class="text-secondary fz-14 mt-4 text-center">
        <router-link class="text-decoration-none" to="/sign-up">Зарегистрируйтесь</router-link>,
        если у вас нет еще учетной записи.
      </div>
    </div>
  </app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import AuthForm from '@/components/AuthForm'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { error } from '@/utils/error'
import { computed, watch } from 'vue'

export default {
  name: 'Auth',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'danger'
      })
    }

    const isAuth = computed(() => store.getters['auth/isAuthenticated'])
    const redirectIsAuth = (val) => {
      const auth = val || isAuth.value
      if (auth && route.path === '/sign-in') {
        router.push('/')
      }
    }

    redirectIsAuth()

    watch(isAuth.value, val => {
      redirectIsAuth(val)
    })
  },
  components: {
    AuthForm,
    AppPage
  }
}
</script>

<style scoped>

</style>
