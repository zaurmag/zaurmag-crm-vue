<template>
  <div class="placeholder-glow">
    <div v-for="i in +rows" :key="i" class="row gx-2 mb-2">
      <div
        v-for="n in +cols"
        :key="n"
        class="col">
        <div class="placeholder placeholder w-100 d-block"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineProps({
  rows: {
    type: [Number, String],
    required: false,
    default: 10
  },
  cols: {
    type: [Number, String],
    required: false,
    default: 8
  }
})
</script>
