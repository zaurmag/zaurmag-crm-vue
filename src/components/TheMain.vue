<template>
	<main class="main">
		<slot />
	</main>
</template>

<style scoped lang="sass">
.main
	padding: 15px

	@include media-breakpoint-up(lg)
		padding: 30px
</style>
