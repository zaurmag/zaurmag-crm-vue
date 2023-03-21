<template>
  <component
    :is="layout + '-layout'"
    v-if="layout"
  />
</template>

<script lang="ts">
import EmptyLayout from '@/layout/EmptyLayout.vue'
import MainLayout from '@/layout/MainLayout.vue'
import { useRoute } from 'vue-router'
import { computed, defineComponent } from 'vue'

export default defineComponent({
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
})
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
