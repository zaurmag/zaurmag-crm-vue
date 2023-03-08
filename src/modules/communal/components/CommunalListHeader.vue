<template>
  <div class="col-md-auto mb-10 mb-md-0">
    <h5 class="h6 mb-0 card-header-title">Список платежей</h5>
  </div>

  <div
    v-if="checkboxes.length"
    class="col-auto d-flex align-items-center"
  >
    <p class="text-secondary m-0 ms-md-3">Отмечено: {{ checkboxes.length }}</p>
    <app-button
      class="ms-3"
      class-list-btn="btn-outline-danger btn-md p-2 px-md-2 fz-18 fz-md-14"
      :icon="{ name: 'trash', placement: 'prepend' }"
      @click="$emit('remove')"
    >
      <span class="ms-1 d-none d-lg-inline">Удалить</span>
    </app-button>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineEmits(['remove'])

// eslint-disable-next-line no-undef
defineProps({
  checkboxes: {
    type: Array,
    required: true,
    default() {
      return []
    }
  }
})
</script>
