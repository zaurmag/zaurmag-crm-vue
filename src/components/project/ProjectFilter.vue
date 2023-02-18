<template>
  <div class="filter">
    <div class="d-md-none d-flex">
      <app-button
        class="ms-auto"
        :class-list-btn="`fz-18' 'p-2' ${isActive ? 'btn-primary' : 'btn-secondary'}`"
        :attrs="{
          'data-bs-toggle': 'collapse',
          'data-bs-target': '#projectsFilter',
          'aria-expanded': false
        }"
        :icon="{ name: 'filter', placement: 'prepend' }"
      />
    </div>

    <div
      id="projectsFilter"
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
          v-model="type"
          :options="typeOptions"
          placeholder="Статус оплаты"
        />
      </div>

      <div class="col-md-auto">
        <form-control
          id="filterSearch"
          v-model="search"
          type="search"
          placeholder="Поиск по имени"
          class="d-flex align-items-center mb-0"
          class-list-input="form-control-bb ps-20"
        >
          <template #prepend>
            <svg-icon name="search" />
          </template>
        </form-control>
      </div>

      <div
        v-if="isActive"
        class="col-md-auto align-self-center"
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
import { PERIOD_OPTIONS, TYPE_OPTIONS } from '@/constans'
import { ref, watch, computed } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])
// eslint-disable-next-line no-undef
defineProps({
  modelValue: { type: String, default: '' }
})

const periodOptions = ref(PERIOD_OPTIONS)
const periodSelect = ref()
const typeOptions = ref(TYPE_OPTIONS)
const type = ref()
const dateFrom = ref()
const dateTo = ref()
const search = ref()

const isActive = computed(() => {
  return dateFrom.value || dateTo.value || (type.value && type.value !== 'all') || search.value
})

const reset = () => {
  dateFrom.value = ''
  dateTo.value = ''
  type.value = ''
  periodSelect.value = ''
  search.value = ''
}

watch([dateFrom, dateTo, type, search], ([dateFrom, dateTo, type, search]) => {
  emit('update:modelValue', {
    dateFrom,
    dateTo,
    type,
    search
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
