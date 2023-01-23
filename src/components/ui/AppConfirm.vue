<template>
  <app-bs-modal
    :id="id"
    :title="title"
    :close="confirm"
  >
    <p class="mb-0">{{ text }}</p>

    <template #footer>
      <button
        class="btn btn-success"
        type="button"
        @click="resolve"
      >
        Да
      </button>
      <button
        class="btn btn-secondary"
        type="button"
        @click="confirm = true"
      >
        Отмена
      </button>
    </template>
  </app-bs-modal>
</template>

<script setup>
import { ref } from 'vue'

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

const confirm = ref(false)

const resolve = () => {
  emit('resolve')
  confirm.value = true
}
</script>
