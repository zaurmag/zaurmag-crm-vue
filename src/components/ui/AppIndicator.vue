<template>
  <span :class="['indicator', classList, { [`indicator--${size}`]: size }]" />
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  classList: {
    type: String,
    required: false
  },
  size: {
    type: String,
    required: false,
    validator(value) {
      return ['xl', 'md', 'sm'].includes(value)
    }
  }
})
</script>

<style scoped lang="sass">
.indicator
	border-radius: 50%
	display: inline-block
	height: 8px
	width: 8px

	&--lg
		width: 12px
		height: 12px

	&--xl
		width: 18px
		height: 18px
</style>
