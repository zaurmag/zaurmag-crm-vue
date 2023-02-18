<template>
  <svg :class="['icon', `${prefix}-${name}`]">
    <use
      :xlink:href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped lang="sass">
.icon
	display: inline-block
	width: 1em
	height: 1em
	fill: currentColor
</style>
