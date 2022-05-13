<template>
  <div :class="['select', {'is-open': isOpen}, classList]">
    <div class="select__text" @click="toggle" ref="selectText">
      {{ current && !reset ? current.name : reset ? placeholder : text }}
    </div>
    <div class="select__dropdown">
      <ul class="select__list shadow-sm">
        <li
          :class="['select__item', {'is-selected': text === option.name && !reset}]"
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
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'AppSelect',
  emits: ['select'],
  props: {
    options: {
      type: Array,
      required: true
    },
    current: {
      type: Object,
      required: false
    },
    classList: {
      type: Array,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Выберите...'
    },
    reset: {
      type: Boolean,
      required: false
    }
  },
  setup (props, { emit }) {
    const selectText = ref()
    const text = ref(props.placeholder)
    const isOpen = ref(false)
    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const close = () => {
      isOpen.value = false
    }

    const select = option => {
      text.value = option.name
      emit('select', option)
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
