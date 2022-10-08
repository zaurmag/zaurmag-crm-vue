<template>
  <svg :class="['icon', `icon-${name}`, classList]">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script setup>
import { defineProps } from 'vue'
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
