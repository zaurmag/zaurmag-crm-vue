<template>
  <div class="d-flex align-items-center">
    <h5 class="h6 mb-0 card-header-title">Проекты</h5>

    <template v-if="checkboxes.length">
      <p class="text-secondary ms-3 m-0">Отмечено: {{ checkboxes.length }}</p>
      <button class="btn btn-outline-danger btn-sm ms-2" type="button" @click="$emit('remove')">
        <app-icon name="trash" />
        Удалить
      </button>
    </template>
  </div>
  <button
    class="btn btn-light d-xl-none"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#filter"
    aria-expanded="false"
  >
    <app-icon name="sliders" />
  </button>
</template>

<script>
export default {
  name: 'ProjectListHeader',
  props: {
    checkboxes: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  emits: ['remove']
}
</script>
