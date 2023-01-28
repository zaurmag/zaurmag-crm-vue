<template>
  <div class="filter">
    <div class="d-md-none d-flex">
      <app-button
        class="ms-auto"
        :class-list-btn="`fz-18' 'p-2' ${isActive ? 'btn-primary' : 'btn-secondary'}`"
        :attrs="{
          'data-bs-toggle': 'collapse',
          'data-bs-target': '#communalFilter',
          'aria-expanded': false
        }"
        :icon="{ name: 'filter', placement: 'prepend' }"
      />
    </div>

    <div
      id="communalFilter"
      class="filter__content row gx-10 gy-md-0 gy-10 collapse d-md-flex"
    >
      <div class="col-md">
        <app-period-date-range
          v-model:dateFrom="dateFrom"
          v-model:dateTo="dateTo"
          v-model:select="periodSelect"
          :period-options="periodOptions"
          align-end
        />
      </div>

      <div class="col-md-auto">
        <form-select
          v-model="status"
          :options="statusOptions"
          placeholder="Статус оплаты"
        />
      </div>

      <div
        v-if="isActive"
        class="col-md-auto"
      >
        <app-button
          class="d-none d-md-inline-flex"
          class-list-btn="btn-outline-secondary btn-round fz-16 p-0"
          :attrs="{ 'data-bs-toggle': 'tooltip', title: 'Сбросить фильтр' }"
          :icon="{ name: 'x', placement: 'prepend' }"
          @click="reset"
        />

        <app-button
          class="d-md-none d-block"
          class-list-btn="btn-primary w-100"
          @click="reset"
        >
          Сбросить фильтр
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppPeriodDateRange from '@/components/ui/AppPeriodDateRange.vue'
import { ref, watch, computed } from 'vue'
import { PERIOD_OPTIONS, STATUS_OPTIONS } from '@/constans'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line no-undef
defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const periodOptions = ref(PERIOD_OPTIONS.slice(3))
const periodSelect = ref()
const statusOptions = ref(STATUS_OPTIONS)
const status = ref()
const dateFrom = ref()
const dateTo = ref()

const isActive = computed(() => {
  return dateFrom.value || dateTo.value || (status.value && status.value !== 'all')
})

const reset = () => {
  dateFrom.value = ''
  dateTo.value = ''
  status.value = ''
  periodSelect.value = ''
}

watch([dateFrom, dateTo, status], ([dateFrom, dateTo, status]) => {
  emit('update:modelValue', {
    dateFrom,
    dateTo,
    status
  })
})
</script>

<style scoped lang="sass">
.filter
	&__content
		margin-top: 0
		align-items: center

		@include media-breakpoint-up(md)
			justify-content: flex-end
</style>
