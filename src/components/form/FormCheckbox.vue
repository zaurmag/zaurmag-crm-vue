<template>
  <div :class="['form-check', 'form-switch', classListWrapper]">
    <input :class="['form-check-input', classListInput]" :id=id type="checkbox" role="switch" v-model="model">
    <label :class="['form-check-label', classListLabel]" :for=id>{{ label }}</label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])
// eslint-disable-next-line no-undef
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: false
  },
  classListWrapper: {
    type: String,
    required: false
  },
  classListInput: {
    type: String,
    required: false
  },
  classListLabel: {
    type: String,
    required: false
  }
})

const model = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>

<style scoped>

</style>
