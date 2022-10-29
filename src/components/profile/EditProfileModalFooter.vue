<template>
  <div class="row align-items-center m-0 w-100" v-if="save && progress === 100">
    <div class="col text-success">
      <div class="alert alert-info p-2 m-0">Изображение загружено!</div>
    </div>
    <div class="col-auto text-success">
      <button class="btn btn-primary" type="button" data-bs-dismiss="modal" @click="cancel">Закрыть</button>
    </div>
  </div>
  <template v-else>
    <button class="btn btn-primary" type="button" @click="$emit('save')">Сохранить</button>
    <button
      class="btn btn-secondary"
      type="button"
      data-bs-dismiss="modal"
      @click="cancel"
    >Отмена</button>
  </template>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineEmits(['save'])

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
