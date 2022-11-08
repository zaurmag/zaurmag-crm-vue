<template>
  <div :class="['mb-3', classListWrapper]">
    <label v-if="label" class="form-label" :for="id">{{ label }}</label>

    <div v-if="type === 'password'" class="form-control-password">
      <input
        :class="['form-control', { 'is-invalid': error }, classListInput]"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="model"
        @blur="blur"
      >
      <button
        class="btn btn-empty form-control-toggle p-0"
        type="button"
        ref="togglePass"
      >
        <app-icon name="eye" />
      </button>
    </div>

    <textarea
      v-else-if="type === 'textarea'"
      :class="['form-control', { 'is-invalid': error }, classListInput]"
      :id="id"
      @blur="blur"
      v-model="model"
    ></textarea>

    <input
      v-else
      :class="['form-control', { 'is-invalid': error }, classListInput]"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      v-model="model"
      @blur="blur"
    >
    <div class="invalid-feedback d-block fz-12" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import togglePassword from '@/utils/toggle-password'

export default {
  name: 'FormControl',
  props: {
    label: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    modelValue: {
      type: Object,
      required: true
    },
    error: {
      type: String,
      required: false
    },
    blur: {
      type: Function,
      required: false
    },
    placeholder: {
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
    }
  },
  setup (props, { emit }) {
    const togglePass = ref(null)
    const model = computed({
      get () {
        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      }
    })

    onMounted(() => {
      if (togglePass.value) {
        togglePassword(togglePass.value)
      }
    })

    return {
      togglePass,
      model
    }
  }
}
</script>
