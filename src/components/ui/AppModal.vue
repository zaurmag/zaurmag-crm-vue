<template>
  <div
    v-if="isShow"
    class="modal fade shadow d-block"
    :class="{ show: classShow }"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <header class="modal-header px-20">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            class="btn-close btn btn-icon btn-sm"
            type="button"
            @click="$emit('close'), (modal = false)"
          />
        </header>

        <div class="modal-body p-20">
          <slot name="default" />
        </div>

        <div
          v-if="isFooter"
          class="modal-footer p-20 text-center"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
    <div
      class="modal-backdrop fade"
      :class="{ show: classShow }"
      @click="$emit('close'), (modal = false)"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'AppModal',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { slots }) {
    const modal = ref(false)
    const isShow = ref(false)
    const classShow = ref(false)

    watch(modal, val => {
      if (val) {
        isShow.value = true
        setTimeout(() => {
          classShow.value = true
        }, 100)
      } else {
        classShow.value = false

        setTimeout(() => {
          isShow.value = false
        }, 100)
      }
    })

    return {
      isFooter: !!slots.footer,
      isShow,
      classShow,
      modal
    }
  }
}
</script>

<style scoped>
.modal-dialog {
  z-index: 1051;
}
</style>
