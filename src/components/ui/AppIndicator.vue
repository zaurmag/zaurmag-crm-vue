<template>
  <span
    :class="['indicator', classList, {[`indicator--${size}`]: size}]"
  ></span>
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
    validator (value) {
      return ['xl', 'md', 'sm'].includes(value)
    }
  }
})
</script>
