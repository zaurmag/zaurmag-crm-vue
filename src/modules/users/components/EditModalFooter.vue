<template>
  <div
    v-if="save && progress === 100"
    class="row align-items-center m-0 w-100"
  >
    <div class="col text-success">
      <div class="alert alert-info p-2 m-0">Изображение загружено!</div>
    </div>
    <div class="col-auto text-success">
      <app-button
        class-list-btn="btn-primary"
        :attrs="{ 'data-bs-dismiss': 'modal' }"
        @click="cancel"
      >
        Закрыть
      </app-button>
    </div>
  </div>
  <template v-else>
    <app-button
      class-list-btn="btn-primary"
      @click="$emit('save')"
    >
      Сохранить
    </app-button>
    <app-button
      class-list-btn="btn-secondary"
      :attrs="{ 'data-bs-dismiss': 'modal' }"
      @click="cancel"
    >
      Отмена
    </app-button>
  </template>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineEmits(['save'])

// eslint-disable-next-line no-undef
defineProps({
  save: {
    type: Boolean,
    required: true
  },
  cancel: {
    type: Boolean,
    required: true
  },
  progress: {
    type: Number,
    required: true
  }
})
</script>
