<template>
  <div class="modal fade shadow" :id="id" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <header class="modal-header px-20">
          <h5 class="modal-title">{{ title }}</h5>
          <button class="btn-close btn btn-icon btn-sm" type="button" data-bs-dismiss="modal"></button>
        </header>

        <div class="modal-body p-20">
          <slot name="default" />
        </div>

        <div class="modal-footer p-20 text-center" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" data-bs-dismiss="modal"></div>
  </div>
</template>

<script>
export default {
  name: 'AppBsModal',
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .modal-dialog {
    z-index: 1051;
  }
</style>
