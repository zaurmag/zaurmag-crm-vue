<template>
  <div class="dropdown">
    <button
      class="btn btn-light"
      type="button"
      data-bs-toggle="dropdown"
    >
     <app-icon name="calendar3" />
      <span class="ms-2">{{ text }}</span>
    </button>

    <div class="dropdown-menu p-3">
      <div class="col-sm col-md-auto d-flex align-items-center">
        <label class="text-secondary me-2">от:</label>
        <input
          class="form__control"
          id="filterDateFrom"
          type="date"
          v-model="from"
          @input="changeDateHandler"
        >
      </div>

      <div class="col-sm col-md-auto d-flex align-items-center">
        <label class="form__label me-2" for="filterDateTo">до:</label>
        <input
          class="form__control"
          id="filterDateTo"
          type="date"
          v-model="to"
          @input="changeDateHandler"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { textRangePeriod } from '@/utils/filter-period'

export default {
  name: 'AppArbitraryPeriod',
  components: {},

  props: ['dateFrom', 'dateTo'],
  emits: ['update:dateFrom', 'update:dateTo', 'datesOut'],
  setup (props, { emit }) {
    const text = ref('Произвольно')
    const from = computed({
      get () {
        return props.dateFrom
      },
      set (value) {
        emit('update:dateFrom', value)
      }
    })

    const to = computed({
      get () {
        return props.dateTo
      },
      set (value) {
        emit('update:dateTo', value)
      }
    })

    const dateRange = ref({
      from: '',
      to: ''
    })

    watch([from, to], ([dateFrom, dateTo]) => {
      if (dateFrom && dateTo) {
        text.value = textRangePeriod(dateFrom, dateTo)
      }

      if (!dateFrom && !dateTo) {
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

      emit('datesOut', dateRange.value)
    }

    return {
      text,
      from,
      to,
      changeDateHandler
    }
  }
}
</script>
