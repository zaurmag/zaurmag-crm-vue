<template>
  <header class="header sticky-top">
    <div class="header__left d-flex align-items-center">
      <div class="text-secondary">{{ $dateF(date, {format: 'datetime', month: 'long'}) }}</div>
    </div>
    <div class="header__right" v-if="user">
      <div class="header__user-dropdown dropdown">
        <button
          class="dropdown-toggle btn"
          type="button"
          data-bs-toggle="dropdown"
        >
          <img class="rounded-circle img-fluid me-2" src="/images/zaurmag.png" width="32" :alt="user.name" />
          {{ user.info.name }}
        </button>
        <ul class="dropdown-menu shadow-sm-soft">
          <li><router-link class="dropdown-item" to="/profile">Мой профиль</router-link></li>
          <li><a class="dropdown-item" href="#" @click.prevent="logout">Выход</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { onMounted, onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TheHeader',
  props: ['tooltipTlt'],
  emits: ['toggle'],
  setup () {
    const date = ref(Date())
    const interval = ref(null)
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      interval.value = setInterval(() => {
        date.value = Date()
      }, 1000)
    })

    onBeforeMount(() => {
      clearInterval(interval.value)
    })

    const logout = () => {
      store.commit('auth/logout')
      router.push('/sign-in?message=auth')
    }

    return {
      date,
      logout,
      user: computed(() => store.getters['auth/user'])
    }
  }
}
</script>

<style scoped>

</style>
