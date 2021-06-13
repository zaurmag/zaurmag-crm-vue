<template>
  <div class="modal fade shadow" :id="id" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <header class="modal-header px-30">
          <h5 class="modal-title">{{ title }}</h5>
          <button class="btn-close btn btn-icon btn-sm" type="button" data-bs-dismiss="modal" aria-label="Close" @click="$emit('close')"></button>
        </header>

        <div class="modal-body p-30">
          <slot name="default" />
        </div>

        <div class="modal-footer px-20 text-center" v-if="isFooter">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  emits: ['close'],
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup (_, { slots }) {
    return {
      isFooter: !!slots.footer
    }
  }
}
</script>

<style scoped>

</style>
