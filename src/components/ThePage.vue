<template>
  <div class="page">
    <slot />
  </div>
</template>

<style scoped lang="sass">
.page
	margin: 0 auto
	text-align: left
	min-width: 320px
	max-width: 1920px
	height: 100vh

	&--empty
		background: $white url("/images/empty-layout-cover.jpg") 0 0 /cover no-repeat
</style>
