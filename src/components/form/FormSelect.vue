<template>
  <div :class="['select', { 'is-open': isOpen }, { 'is-invalid': error }, classList]">
    <div
      :class="['select__text', 'btn', 'btn-light', { 'text-secondary': text === 'Выберите...' }]"
      @click="toggle"
      ref="selectText"
    >
      {{ text }}
    </div>

    <div class="select__dropdown">
      <ul class="select__list shadow-sm">
        <li
          :class="['select__item', {'is-selected': text === option.name}]"
          v-for="option in options"
          :key="option.name"
          :data-value="option.value"
          @click="select(option)"
          :title="option.name"
        >{{ option.name }}</li>
      </ul>
    </div>
  </div>
  <div class="invalid-feedback d-block fz-12" v-if="error">{{ error }}</div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'FormSelect',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object
    },
    error: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    },
    classList: {
      type: Array,
      required: false
    }
  },
  setup (props, { emit }) {
    const selectText = ref()
    const text = ref(props.modelValue?.name || 'Выберите...')
    const isOpen = ref(false)
    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const close = () => {
      isOpen.value = false
    }

    const select = option => {
      text.value = option.name
      emit('update:modelValue', option.value)
      close()
    }

    const clickHandler = event => {
      if (event.target !== selectText.value) {
        close()
      }
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler, true)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler, true)
    })

    return {
      selectText,
      text,
      isOpen,
      toggle,
      select
    }
  }
}
</script>
