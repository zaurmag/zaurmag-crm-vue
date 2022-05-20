<template>
  <div class="dropdown">
    <a
      href="#"
      class="dropdown-toggle btn btn-outline-secondary px-3 btn-sm"
      data-bs-toggle="dropdown"
    >{{ text }}</a>

    <div class="dropdown-menu p-3">
      <div class="col-sm col-md-auto d-flex align-items-center">
        <label class="text-secondary me-2">от:</label>
        <input
          class="form__control"
          id="filterDateFrom"
          type="date"
          v-model="date.from"
          @input="changeDateHandler"
        >
      </div>

      <div class="col-sm col-md-auto d-flex align-items-center">
        <label class="form__label me-2" for="filterDateTo">до:</label>
        <input
          class="form__control"
          id="filterDateTo"
          type="date"
          v-model="date.to"
          @input="changeDateHandler"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { textRangePeriod } from '@/utils/filter-period'

export default {
  name: 'AppArbitraryPeriod',
  emits: ['update:modelValue', 'datesOut'],
  props: ['modelValue'],
  setup (props, { emit }) {
    const text = ref('Произвольно')
    const dateRange = ref({
      from: '',
      to: ''
    })
    const date = computed(() => props.modelValue)

    watch(date, date => {
      text.value = textRangePeriod(date.from, date.to)
      if (date.from === undefined && date.to === undefined) {
        text.value = 'Произвольно'
      }
    })

    const changeDateHandler = event => {
      if (event.target.id === 'filterDateFrom') {
        dateRange.value.from = event.target.value
      }

      if (event.target.id === 'filterDateTo') {
        dateRange.value.to = event.target.value
      }

      if (dateRange.value.from && dateRange.value.to) {
        emit('datesOut', dateRange.value)
        text.value = textRangePeriod(dateRange.value.from, dateRange.value.to)
      }
    }

    return {
      text,
      date,
      changeDateHandler
    }
  }
}
</script>

<style scoped>

</style>
