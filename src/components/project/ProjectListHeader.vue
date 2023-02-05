<template>
  <div class="d-flex align-items-center">
    <h5 class="h6 mb-0 card-header-title">Проекты</h5>

    <template v-if="checkboxes.length">
      <p class="text-secondary ms-3 m-0">Отмечено: {{ checkboxes.length }}</p>
      <app-button
        class="ms-3"
        class-list-btn="btn-outline-danger btn-sm p-2"
        :icon="{ name: 'trash', placement: 'prepend' }"
        @click="$emit('remove')"
      >
        <span class="ms-1 d-none d-lg-inline">Удалить</span>
      </app-button>
    </template>
  </div>
  <button
    class="btn btn-light d-xl-none"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#filter"
    aria-expanded="false"
  >
    <svg-icon name="sliders" />
  </button>
</template>

<script>
export default {
  name: 'ProjectListHeader',
  props: {
    checkboxes: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  emits: ['remove']
}
</script>
