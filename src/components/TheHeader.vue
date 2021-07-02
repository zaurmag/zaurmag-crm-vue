<template>
  <header class="header sticky-top">
    <div class="header__left d-flex align-items-center">
      <a class="header__sb-collapse" href="#" v-tooltip="{title: tooltipTlt, placement: 'right'}" @click.prevent="$emit('toggle')">
        <svg class="icon icon-arrow-bar-left">
          <use xlink:href="#arrow-bar-left"></use>
        </svg>
        <svg class="icon icon-arrow-bar-right">
          <use xlink:href="#arrow-bar-right"></use>
        </svg>
      </a>
      <div class="text-secondary small ms-lg-40 ms-15">{{ $dateF(date, 'datetime') }}</div>
    </div>
    <div class="header__right">
      <div class="header__user-dropdown dropdown">
        <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown">
          <img class="header__user-drp-img img-fluid me-2" src="/images/zaurmag.png" alt="Заур">
          Заур
        </a>
        <ul class="dropdown-menu shadow">
          <li><a class="dropdown-item" href="#">Мой профиль</a></li>
          <li><a class="dropdown-item" href="#" @click.prevent="logout">Выход</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { onMounted, onBeforeMount, ref } from 'vue'
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
      router.push('/sign-in')
    }

    return {
      date,
      logout
    }
  }
}
</script>

<style scoped>

</style>
