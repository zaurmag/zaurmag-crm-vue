<template>
  <nav class="navbar sidebar__nav">
    <ul class="nav flex-column navbar-nav">
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{ name: 'Home' }"
        >
          <svg-icon name="speedometer2" />
          <span class="nav-text">Главная</span>
        </router-link>
      </li>

      <li
        v-for="link in links"
        :key="link.name"
        class="nav-item"
      >
        <router-link
          :to="{ name: link.name }"
          :class="['nav-link', { 'is-active': route.matched[0].path === link.path }]"
        >
          <svg-icon :name="link.icon" />
          <span class="nav-text">{{ link.title }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useLinksFromRoutes } from '@/use/links-from-routes'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const isAdmin = store.getters['users/isAdmin']

const links = useLinksFromRoutes()
</script>

<style lang="sass">
.nav
	.nav-item
		&:not(:last-child)
			margin-bottom: 8px

	.nav-text
		margin-left: 15px

	.nav-link
		display: flex
		color: $black

		.icon
			margin-top: 3px
			flex-shrink: 0
			font-size: 16px

		&:hover
			&:not(.active)
				color: $primary
</style>
