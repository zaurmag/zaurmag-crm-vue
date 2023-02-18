<template>
  <app-bs-modal
    :id="id"
    :title="title"
  >
    <p class="mb-0">{{ text }}</p>

    <template #footer>
      <button
        class="btn btn-success"
        type="button"
        @click="emit('resolve')"
      >
        Да
      </button>
      <button
        class="btn btn-secondary"
        type="button"
        data-bs-dismiss="modal"
      >
        Отмена
      </button>
    </template>
  </app-bs-modal>
</template>

<script setup>
// eslint-disable-next-line no-undef
const emit = defineEmits(['resolve'])

// eslint-disable-next-line no-undef
defineProps({
  id: {
    type: String,
    required: true,
    default: 'confirm'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>
