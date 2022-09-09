<template>
  <nav class="navbar">
    <ul class="nav flex-column navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">
          <svg class="icon icon-speedometer2">
            <use xlink:href="#speedometer2"></use>
          </svg>
          <span class="nav-text">Главная</span>
        </router-link>
      </li>
      <li class="nav-item" v-if="admin">
        <router-link class="nav-link" to="/users">
          <svg class="icon icon-people">
            <use xlink:href="#people"></use>
          </svg>
          <span class="nav-text">Пользователи</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()
const admin = store.getters['auth/isAdmin']
</script>
