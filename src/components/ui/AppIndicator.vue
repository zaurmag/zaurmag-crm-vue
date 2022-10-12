<template>
  <span
    :class="['indicator', classList, {[`indicator--${size}`]: size}]"
  ></span>
</template>

<script setup>
import { defineProps } from 'vue'

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

<script>
export default {
  name: 'AppIndicator'
}
</script>
