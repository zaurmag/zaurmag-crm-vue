<template>
  <div :class="['select', {'is-open': isOpen}, dopCls]">
    <div class="select__text" @click="toggle">{{ current ? current.name : text }}</div>
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
    dopCls: {
      type: String,
      required: false
    }
  },
  setup (_, { emit }) {
    const text = ref('Выберите...')
    const isOpen = ref(false)
    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const close = () => {
      isOpen.value = false
    }

    const select = (option) => {
      text.value = option.name
      emit('select', option)
      close()
    }

    onMounted(() => {
      document.addEventListener('click', close, true)
    })

    onUnmounted(() => {
      document.removeEventListener('click', close, true)
    })

    return {
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
