<template>
  <div :class="['row', 'gx-10', 'gy-md-0', 'gy-10', { 'justify-content-md-end': alignEnd }]">
    <form-select
      v-model="periodSelect"
      class-list="col-md-auto"
      :options="periodOptions"
      :placeholder="selectPlaceholder"
    />

    <div class="dropdown col-md-auto">
      <app-button
        class="w-100"
        class-list-btn="btn-light w-100 justify-content-start"
        :attrs-wrapper="{ 'data-bs-toggle': 'dropdown' }"
        :icon="{ name: 'calendar3', placement: 'prepend' }"
      >
        <span class="ms-2 text-nowrap">{{ rangeDatesText }}</span>
      </app-button>

      <div class="dropdown-menu p-3">
        <form-control
          id="filterDateFrom"
          v-model="from"
          class="d-flex align-items-center mb-2"
          class-list-label="text-secondary me-2 mb-0"
          class-list-input="form-control-sm form-control-bb"
          label="от:"
          type="date"
        />

        <form-control
          id="filterDateTo"
          v-model="to"
          class="d-flex align-items-center"
          class-list-label="text-secondary me-2 mb-0"
          class-list-input="form-control-sm form-control-bb"
          label="до:"
          type="date"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getDateFromPeriod, dateF } from '@/utils/date'
import { textRangePeriod } from '@/utils/filter-period'
import { computed, watch, ref } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:dateFrom', 'update:dateTo', 'update:select'])

// eslint-disable-next-line no-undef
const props = defineProps({
  dateFrom: {
    type: String,
    default: ''
  },
  dateTo: {
    type: String,
    default: ''
  },
  select: {
    type: String,
    default: ''
  },
  periodOptions: {
    type: Array,
    required: true,
    default() {
      return []
    }
  },
  selectPlaceholder: {
    type: String,
    default: 'Выбрать период'
  },
  rangeDatePlaceholder: {
    type: String,
    default: 'Диапазон дат'
  },
  alignEnd: {
    type: Boolean,
    required: false,
    default: false
  }
})

const rangeDatesText = ref(props.rangeDatePlaceholder)

const periodSelect = computed({
  get() {
    return props.select
  },
  set(period) {
    from.value = getDateFromPeriod(period, true)
    to.value = dateF(Date.now(), { locale: 'fr-CA' })
    emit('update:select', period)
  }
})

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

watch([from, to], ([dateFrom, dateTo]) => {
  if (dateFrom && dateTo) {
    rangeDatesText.value = textRangePeriod(dateFrom, dateTo)
  } else {
    rangeDatesText.value = props.rangeDatePlaceholder
  }

  props.periodOptions.forEach(({ value }) => {
    if (
      dateFrom === getDateFromPeriod(value, true) &&
      dateTo === dateF(Date.now(), { locale: 'fr-CA' })
    ) {
      periodSelect.value = value
    } else if (value === periodSelect.value) {
      periodSelect.value = ''
    }
  })
})
</script>

<style scoped></style>
