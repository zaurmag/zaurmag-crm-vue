<template>
  <nav class="navbar sidebar__nav">
    <ul class="nav flex-column navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" :to="{name: 'Home'}">
          <app-icon name="speedometer2" />
          <span class="nav-text">Главная</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{name: 'Communal'}" :class="['nav-link', {'is-active': route.name === 'Communal'}]">
          <app-icon name="house" />
          <span class="nav-text">Платежи ЖКХ</span>
        </router-link>
      </li>
      <li class="nav-item" v-if="isAdmin">
        <router-link :to="{name: 'Users'}" :class="['nav-link', {'is-active': route.name === 'Profile'}]">
          <app-icon name="people" />
          <span class="nav-text">Пользователи</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const isAdmin = store.getters['users/isAdmin']
</script>
