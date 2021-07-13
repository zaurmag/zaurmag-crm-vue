<template>
  <div v-if="isShow" class="modal fade shadow d-block" :class="{'show': classShow}" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <header class="modal-header px-20">
          <h5 class="modal-title">{{ title }}</h5>
          <button class="btn-close btn btn-icon btn-sm" type="button" @click="$emit('close'); modal = false"></button>
        </header>

        <div class="modal-body px-20 fz-14">
          <slot name="default" />
        </div>

        <div class="modal-footer px-20 text-center" v-if="isFooter">
          <slot name="footer" />
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{'show': classShow}" @click="$emit('close'); modal = false"></div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'AppModal',
  emits: ['close'],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup (props, { slots }) {
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
    z-index: 1041;
  }
</style>
