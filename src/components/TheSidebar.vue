<template>
  <aside
    id="sidebarMenu"
    class="sidebar"
    :class="{ 'is-compact': sidebarState }"
  >
    <button
      :key="toggleBtnTooltip"
      v-tooltip="{ title: toggleBtnTooltip, placement: 'right' }"
      class="btn-round p-0 sidebar__collapse-btn"
      :class="{ 'is-active': sidebarState }"
      type="button"
      data-bs-toggle="tooltip"
      data-bs-placement="right"
      data-bs-title="Свернуть"
      @click="toggleSbHandler"
    >
      <svg-icon name="arrow-bar-left" />
      <svg-icon name="arrow-bar-right" />
    </button>

    <app-logo
      url="/"
      class-list="sidebar__logo mb-25"
    />
    <app-nav />
  </aside>
</template>

<script setup>
import AppLogo from '@/components/AppLogo.vue'
import AppNav from '@/components/AppNav.vue'
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'

const store = useStore()
const sidebarState = computed(() => store.getters.sidebar)
const toggleBtnTooltip = ref('свернуть')
const body = document.body

const toggleSbHandler = () => {
  store.commit('setSidebar', !sidebarState.value)
}

watch(sidebarState, val => {
  if (val) {
    body.classList.add('is-sb-collapsed')
    toggleBtnTooltip.value = 'развернуть'
  } else {
    body.classList.remove('is-sb-collapsed')
    toggleBtnTooltip.value = 'свернуть'
  }
})
</script>

<style scoped lang="sass">
.sidebar
	$self: &

	background-color: #192b58
	color: $white
	position: fixed
	top: 0
	bottom: 0
	left: 0
	z-index: 1022
	box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1)
	padding: 0 20px 20px
	width: 260px

	@include media-breakpoint-down(lg)
		transform: translateX(-100%)
		transition: transform .2s ease

		.is-sb-collapsed &,
		&.is-compact
			transform: translateX(0)
			transition: transform .2s ease

	@include media-breakpoint-up(lg)
		transition: width .2s ease

		.is-sb-collapsed &,
		&.is-compact
			width: 80px
			transition: width .2s ease

	// Collapse button
	&__collapse-btn
		position: absolute
		right: 0
		top: 13px
		display: flex
		align-items: center
		justify-content: center
		text-decoration: none
		color: $white
		transform: translateX(50%)
		border: 1px solid rgba($white, 0.3)
		width: 38px
		height: 38px
		background-color: #192b58

		@include media-breakpoint-up(lg)
			transition: background-color .3s ease

			&:hover
				background-color: $blue-600

		@include media-breakpoint-down(lg)
			transform: translateX(calc(100% + 10px))

		.icon
			font-size: 15px
			pointer-events: none

			&-arrow-bar-right
				display: block
				@include media-breakpoint-up(lg)
					display: none

			@include media-breakpoint-down(lg)
				&-arrow-bar-left
					display: none

		&.is-active,
		.is-full &
			.icon
				&-arrow-bar-left
					display: block

				&-arrow-bar-right
					display: none

				@include media-breakpoint-up(lg)
					&-arrow-bar-right
						display: block

					&-arrow-bar-left
						display: none

	// Logo
	:deep(#{$self}__logo)
		padding: 15px 0

		.logo__text
			color: $white

		@include media-breakpoint-up(lg)
			height: 65px

			.is-sb-collapsed &,
			.is-compact &
				text-align: center
				padding-left: 0
				padding-right: 0

				.icon
					font-size: 28px
					margin-right: 0 !important

				.logo__text
					display: none

	// Nav
	&__nav
		:deep(.nav)
			.nav-link
				color: #96a2c1

				&.is-active
					color: $white

				&:hover
					&:not(.active)
						color: $white

			@include media-breakpoint-up(lg)
				.is-sb-collapsed &,
				.is-compact &
					text-align: center

					.nav-text
						display: none

					.nav-item
						margin-bottom: 0

						&:not(:last-child)
							margin-bottom: 30px

					.nav-link
						padding: 0

						.icon
							font-size: 26px
							margin-right: 0 !important
</style>
