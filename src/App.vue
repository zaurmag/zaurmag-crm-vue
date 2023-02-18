<template>
  <component
    :is="layout + '-layout'"
    v-if="layout"
  />
</template>

<script>
import EmptyLayout from '@/layout/EmptyLayout.vue'
import MainLayout from '@/layout/MainLayout.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  components: {
    EmptyLayout,
    MainLayout
  },
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
