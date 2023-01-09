<template>
  <svg :class="['icon', `icon-${name}`, classList]">
    <use :xlink:href="`/images/sprite.svg#${name}`"></use>
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
