<template>
  <aside class="sidebar bg-dark" :class="{'is-compact': toggleClass}" id="sidebarMenu">
    <div class="logo sidebar__logo">
      <app-logo />
    </div>

    <nav class="mt-30">
      <ul class="nav nav-pills flex-column mb-auto navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <svg class="icon icon-speedometer2 me-2">
              <use xlink:href="#speedometer2"></use>
            </svg>
            <span class="nav-text">Главная</span>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <svg class="icon icon-graph-up me-2">
              <use xlink:href="#graph-up"></use>
            </svg>
            <span class="nav-text">Отчеты</span>
          </a>
        </li>
        <li class="nav-item" v-if="admin">
          <a class="nav-link" href="#">
            <svg class="icon icon-people me-2">
              <use xlink:href="#people"></use>
            </svg>
            <span class="nav-text">Пользователи</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import AppLogo from '@/components/ui/AppLogo'
import { useStore } from 'vuex'

export default {
  name: 'TheSidebar',
  props: ['toggleClass'],
  setup () {
    const store = useStore()
    const admin = store.getters['auth/isAdmin']

    return {
      admin
    }
  },
  components: {
    AppLogo
  }
}
</script>

<style scoped>

</style>
