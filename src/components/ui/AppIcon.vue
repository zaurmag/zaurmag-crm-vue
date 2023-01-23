<template>
  <svg :class="['icon', `icon-${name}`, classList]">
    <use :xlink:href="`/images/sprite.svg#${name}`" />
  </svg>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  name: {
    type: String,
    required: true
  },
  classList: {
    type: String,
    required: false
  }
})
</script>

<style scoped lang="sass">
.icon
	display: inline-block
	width: 1em
	height: 1em
	fill: currentColor
</style>
