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
      <form-control
        id="filterDateFrom"
        v-model="from"
        label="от:"
        type="date"
        class="d-flex align-items-center"
        class-list-label="text-secondary me-2 mb-0"
        class-list-input="form-control-sm form-control-bb"
        @input="changeDateHandler"
      />

      <form-control
        id="filterDateTo"
        v-model="to"
        label="до:"
        type="date"
        class="d-flex align-items-center mb-0"
        class-list-label="text-secondary me-2 mb-0"
        class-list-input="form-control-sm form-control-bb"
        @input="changeDateHandler"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { textRangePeriod } from '@/utils/filter-period'

export default {
  name: 'AppArbitraryPeriod',
  props: ['dateFrom', 'dateTo'],
  emits: ['update:dateFrom', 'update:dateTo', 'datesOut'],
  setup(props, { emit }) {
    const text = ref('Произвольно')
    const from = computed({
      get() {
        return props.dateFrom
      },
      set(value) {
        emit('update:dateFrom', value)
      }
    })

    const to = computed({
      get() {
        return props.dateTo
      },
      set(value) {
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
