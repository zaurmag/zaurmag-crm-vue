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
        <li class="nav-item">
          <a class="nav-link" href="#">
            <svg class="icon icon-people me-2">
              <use xlink:href="#people"></use>
            </svg>
            <span class="nav-text">Пользователи</span>
          </a>
        </li>
        <li class="nav-item">
          <router-link to="/sign-in" class="nav-link">
            <svg class="icon people me-2">
              <use xlink:href="#people"></use>
            </svg>
            <span class="nav-text">Авторизация</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import AppLogo from '@/components/ui/AppLogo'

export default {
  name: 'TheSidebar',
  props: ['toggleClass'],
  components: {
    AppLogo
  }
}
</script>

<style scoped>

</style>
