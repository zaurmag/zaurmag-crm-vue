<template>
	<header v-if="$slots.header || title" class="page-header">
		<h1 v-if="title" class="h4 page-header__title">{{ title }}</h1>
		<slot name="header" />
	</header>

	<slot name="default" />
</template>

<script setup>
// eslint-disable-next-line no-undef
const props = defineProps({
	title: {
		type: String,
		default: '',
	},
	back: {
		type: Boolean,
		default: false,
	},
	center: {
		type: Boolean,
		default: false,
	},
})
const title = props.title ? props.title + ' |' : ''
document.title = `${title} Система подсчета доходов/расходов`
</script>

<style scoped lang="sass">
.page-header
	border-bottom: 1px solid $gray-200
	display: flex
	align-items: center
	justify-content: space-between
	padding-bottom: 15px
	margin-bottom: 20px

	@include media-breakpoint-up(lg)
		margin-bottom: 40px
		padding-bottom: 20px

	&__title
		font-weight: 600
		margin-bottom: 0

	&__add-btn,
	:slotted(&__add-btn)
		padding-left: 20px
		padding-right: 20px
		height: 45px

		@include media-breakpoint-down(md)
			border-radius: 50%
			position: fixed
			right: 20px
			bottom: 20px
			z-index: 100
			padding: 0
			height: 60px
			width: 60px

			.icon
				font-size: 24px
</style>
