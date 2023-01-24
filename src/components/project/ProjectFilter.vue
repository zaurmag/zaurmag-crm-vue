<template>
  <div class="form form--filter row gy-3 gy-xl-2 gx-10 mt-xl-0 mt-3">
    <div class="col-xl-auto">
      <div class="row align-items-center g-10">
        <div class="col-sm col-md-auto">
          <form-select
            v-model="periodSelect"
            :placeholder="periodSelectPlaceholder"
            :options="periodOptions"
          />
        </div>
        <div class="col-sm">
          <AppArbitraryPeriod
            v-model:date-from="arbitraryPeriodFrom"
            v-model:date-to="arbitraryPeriodTo"
            @datesOut="arbitraryPeriodDates"
          />
        </div>
      </div>
    </div>
    <div class="col-xl-auto">
      <form-select
        v-model="typeSelect"
        :options="typeOptions"
        placeholder="Тип операции:"
      />
    </div>
    <div class="col-xl-auto">
      <div class="d-flex align-items-center">
        <form-control
          id="filterSearch"
          v-model="search"
          type="search"
          placeholder="Поиск по имени"
          class="d-flex align-items-center"
          class-list-input="form-control-bb ps-20"
        >
          <template #prepend>
            <app-icon name="search" />
          </template>
        </form-control>

        <app-button
          v-if="isActive"
          v-tooltip="{ title: 'Сбросить фильтр' }"
          class-list-wrapper="ms-3"
          class-list-btn="btn-outline-secondary btn-round fz-16 p-0"
          :icon="{ name: 'x', placement: 'prepend' }"
          @click="reset"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppArbitraryPeriod from '@/components/ui/AppArbitraryPeriod.vue'
import { PERIOD_OPTIONS, TYPE_OPTIONS } from '@/constans'
import { ref, watch, computed } from 'vue'
import { dateF, relativeDate, getDateFromPeriod } from '@/utils/date'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line no-undef
defineProps({
  modelValue: {
    type: Object,
    default() {
      return {}
    }
  }
})

const arbitraryPeriodFrom = ref()
const arbitraryPeriodTo = ref()

const periodSelectPlaceholder = 'Выбрать период'
const periodOptions = ref(PERIOD_OPTIONS)
const periodSelect = ref()

const typeOptions = ref(TYPE_OPTIONS)
const typeSelect = ref()

const search = ref()

watch(
  [search, typeSelect, arbitraryPeriodFrom, arbitraryPeriodTo, periodSelect],
  ([search, type, apFrom, apTo, periodSelect]) => {
    if (periodSelect) {
      arbitraryPeriodFrom.value = getDateFromPeriod(periodSelect, true)
      arbitraryPeriodTo.value = dateF(Date.now(), { locale: 'fr-CA' })
      console.log(periodSelect)
    }

    emit('update:modelValue', {
      search,
      type,
      periodFrom: apFrom,
      periodTo: apTo
    })
  }
)

const arbitraryPeriodDates = dates => {
  const rDate = relativeDate(dates.from, dates.to)
  const option = periodOptions.value.find(item => item.value === rDate)

  arbitraryPeriodFrom.value = dates.from
  arbitraryPeriodTo.value = dates.to

  periodSelect.value = !rDate ? periodSelectPlaceholder : {}

  if (option) {
    periodSelect.value = {
      name: option.name,
      value: option.value
    }
  }
}

const isActive = computed(
  () =>
    search.value ||
    typeSelect.value ||
    periodSelect.value ||
    arbitraryPeriodFrom.value ||
    arbitraryPeriodTo.value
)

const reset = () => {
  search.value = ''
  typeSelect.value = ''
  arbitraryPeriodFrom.value = ''
  arbitraryPeriodTo.value = ''
  periodSelect.value = ''
}
</script>
