<template>
  <div :class="['form-check', 'form-switch', classListWrapper]">
    <input :id=id v-model="model" :class="['form-check-input', classListInput]" type="checkbox" role="switch">
    <label :class="['form-check-label', classListLabel]" :for=id>{{ label }}</label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])
// eslint-disable-next-line no-undef
const props = defineProps({
	modelValue: {
		type: Object,
		default() {
			return {}
		}
	},
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: false,
				default: ''
  },
  classListWrapper: {
    type: String,
    required: false,
			default: ''
  },
  classListInput: {
    type: String,
    required: false,
			default: ''
  },
  classListLabel: {
    type: String,
    required: false,
				default: ''
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
