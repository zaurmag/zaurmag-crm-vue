<template>
  <div
    :id="id"
    ref="modalEl"
    :class="['modal', 'fade', 'shadow']"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <header class="modal-header px-20">
          <h5 class="modal-title">{{ title }}</h5>
          <app-button
            class-list-btn="btn-close btn-icon btn-sm"
            :attrs="{ 'data-bs-dismiss': 'modal' }"
          />
        </header>

        <div class="modal-body p-20">
          <slot name="default" />
        </div>

        <div
          v-if="progress"
          class="progress"
          style="height: 2px"
        >
          <div
            class="progress-bar"
            role="progressbar"
            :style="`width: ${progress}%`"
          />
        </div>

        <div
          v-if="$slots.footer"
          class="modal-footer p-20 text-center"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
    <div
      class="modal-backdrop fade"
      data-bs-dismiss="modal"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { Modal } from 'bootstrap'

export default {
  name: 'AppBsModal',
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    progress: {
      type: Number,
      default: 0
    },
    close: {
      type: Boolean,
      default: false
    }
  },
  emits: ['show', 'hide'],
  setup(props, { emit }) {
    const modalEl = ref()

    onMounted(() => {
      // Create instance modal
      const modal = new Modal(`#${modalEl.value.id}`)
      const close = computed(() => props.close)

      // Show event
      modalEl.value.addEventListener('show.bs.modal', () => {
        emit('show', modalEl)
      })

      // Hide event
      modalEl.value.addEventListener('hide.bs.modal', () => {
        emit('hide', modalEl)
      })

      watch(close, val => {
        if (val) {
          modal.hide()
        }
      })
    })

    return {
      modalEl
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  z-index: 1051;
}
</style>
