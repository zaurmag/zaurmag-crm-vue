<template>
  <nav class="navbar sidebar__nav">
    <ul class="nav flex-column navbar-nav">
      <li class="nav-item">
        <button
          :class="['nav-link', 'btn', 'btn-link', { 'is-active': mathPath === '/' }]"
          @click="linkClickHandler({ name: 'Home', path: '/' })"
        >
          <svg-icon name="speedometer2" />
          <span class="nav-text">Главная</span>
        </button>
      </li>

      <li
        v-for="link in links"
        :key="link.name"
        class="nav-item"
      >
        <button
          :class="['nav-link', 'btn', 'btn-link', { 'is-active': mathPath === link.path }]"
          @click="linkClickHandler(link)"
        >
          <svg-icon :name="link.icon" />
          <span class="nav-text">{{ link.title }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useLinksFromRoutes } from '@/use/links-from-routes'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const links = useLinksFromRoutes()
const mathPath = computed(() => route.matched[0].path)

const linkClickHandler = ({ path, name }) => {
  if (route.path !== path) {
    router.push({ name })
    store.commit('setSidebar', false)
  }
}
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
