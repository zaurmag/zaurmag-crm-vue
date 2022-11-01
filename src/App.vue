<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import EmptyLayout from '@/layout/EmptyLayout'
import MainLayout from '@/layout/MainLayout'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  setup () {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {
    EmptyLayout,
    MainLayout
  }
}
</script>

<style>
  [v-cloak] {
    display: none;
  }
</style>
