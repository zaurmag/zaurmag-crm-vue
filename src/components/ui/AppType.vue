<template>
  <span :class="['badge', 'bg-' + className]">{{ text }}</span>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['income', 'outcome', 'pending'].includes(value)
      }
    }
  },
  setup (props) {
    const classesMap = {
      income: 'success',
      outcome: 'danger',
      pending: 'warning'
    }

    const textMap = {
      income: 'Приход',
      outcome: 'Расход',
      pending: 'В ожидании'
    }

    watch(props, val => {
      className.value = classesMap[val.type]
      text.value = textMap[val.type]
    })

    const className = ref(classesMap[props.type])
    const text = ref(textMap[props.type])

    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>
