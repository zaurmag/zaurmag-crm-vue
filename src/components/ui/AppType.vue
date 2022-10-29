<template>
  <div class="d-flex align-items-center">
    <app-indicator :classList="className" />
    <span class="ms-2">{{ text }}</span>
  </div>
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
      income: 'bg-success',
      outcome: 'bg-danger',
      pending: 'bg-warning'
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
