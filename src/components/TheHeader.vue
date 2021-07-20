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
    <div class="header__right" v-if="user">
      <div class="header__user-dropdown dropdown">
        <a class="dropdown-toggle d-flex align-items-center" href="#" data-bs-toggle="dropdown">
          <span class="me-1">
            <img class="header__user-drp-img img-fluid d-block" src="/images/zaurmag.png" alt="Заур">
            <span
              class="badge d-block fz-10 fw-normal"
              :class="user.info.role === 'admin' ? 'bg-danger' : 'bg-success'"
            >{{ user.info.role === 'admin' ? 'Admin' : 'User' }}</span>
          </span>
          {{ user.name }}
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
      router.push('/sign-in')
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
