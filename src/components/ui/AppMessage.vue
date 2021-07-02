<template>
  <div v-if="message" class="toast-container position-fixed top-0 end-0 p-3">
    <div :class="['toast', 'fade', 'show', 'align-items-center', 'text-white', 'bg-' + message.type]" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ message.value }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="close"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AppMessage',
  setup () {
    const store = useStore()
    const message = computed(() => store.state.message)

    return {
      message,
      close: () => store.commit('clearMessage')
    }
  }
}
</script>

<style scoped>
  .toast-container {
    opacity: .8;
    z-index: 1021;
  }
</style>
