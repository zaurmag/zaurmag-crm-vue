<template>
  <div :class="['select', {'is-open': isOpen}, classList]">
    <div class="select__text" @click="toggle" ref="selectText">
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
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

export default {
  name: 'AppSelect',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Object
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
    const text = ref(props.modelValue.name)
    const isOpen = ref(false)
    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const close = () => {
      isOpen.value = false
    }

    const mVal = computed(() => props.modelValue)

    watch(mVal, value => {
      text.value = value.name
    })

    const select = option => {
      emit('update:modelValue', option)
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

<style scoped>

</style>
