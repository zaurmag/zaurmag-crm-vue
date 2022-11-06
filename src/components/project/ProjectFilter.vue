<template>
  <div class="form form--filter row gy-3 gy-xl-2 gx-4 mt-xl-0 mt-3">
    <div class="col-xl-auto">
      <div class="row align-items-center g-4">
        <div class="col-sm col-md-auto">
          <AppSelect
            :options="periodOptions"
            v-model="periodSelect"
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
      <div class="d-flex align-items-center">
        <label class="form__label me-3">Тип операции:</label>
        <AppSelect
          :options="typeOptions"
          v-model="typeSelect"
        />
      </div>
    </div>
    <div class="col-xl-auto">
      <div class="d-flex align-items-center">
        <div class="form__group form__group--icon w-100">
          <app-icon name="search" />
          <input class="form__control" type="search" placeholder="Поиск по наименованию" v-model="search">
        </div>

        <app-button
          classListWrapper="ms-3"
          classListBtn="btn-outline-secondary btn-round fz-16 p-0"
          v-if="isActive"
          v-tooltip="{ title: 'Сбросить фильтр' }"
          @click="reset"
          :icon="{ name: 'x', placement: 'prepend' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { PERIOD_OPTIONS, TYPE_OPTIONS } from '@/constans'
import { ref, watch, computed } from 'vue'
import { dateF, relativeDate, getDateFromPeriod } from '@/utils/date'
import AppSelect from '@/components/ui/AppSelect'
import AppArbitraryPeriod from '@/components/ui/AppArbitraryPeriod'

export default {
  name: 'ProjectFilter',
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup (_, { emit }) {
    const arbitraryPeriodFrom = ref()
    const arbitraryPeriodTo = ref()

    const periodSelectInitial = { name: 'Выбрать период' }
    const periodOptions = ref(PERIOD_OPTIONS)
    const periodSelect = ref(periodSelectInitial)

    const typeOptions = ref(TYPE_OPTIONS)
    const typeSelect = ref(typeOptions.value[0])

    const search = ref()

    watch([
      search,
      typeSelect,
      arbitraryPeriodFrom,
      arbitraryPeriodTo,
      periodSelect
    ], ([search, type, apFrom, apTo, periodSelect]) => {
      if (periodSelect.value) {
        arbitraryPeriodFrom.value = getDateFromPeriod(periodSelect.value, true)
        arbitraryPeriodTo.value = dateF(Date.now(), { locale: 'fr-CA' })
      }

      emit('update:modelValue', {
        search,
        type,
        periodFrom: apFrom || arbitraryPeriodFrom.value,
        periodTo: apTo || arbitraryPeriodTo.value
      })
    })

    const arbitraryPeriodDates = dates => {
      const rDate = relativeDate(dates.from, dates.to)
      const option = periodOptions.value.find(item => item.value === rDate)

      arbitraryPeriodFrom.value = dates.from
      arbitraryPeriodTo.value = dates.to

      periodSelect.value = !rDate ? periodSelectInitial : {}

      if (option) {
        periodSelect.value = {
          name: option.name,
          value: option.value
        }
      }
    }

    const isActive = computed(() => search.value || typeSelect.value.value || periodSelect.value.value || arbitraryPeriodFrom.value || arbitraryPeriodTo.value)

    return {
      arbitraryPeriodFrom,
      arbitraryPeriodTo,
      arbitraryPeriodDates,
      periodSelect,
      periodOptions,
      typeOptions,
      typeSelect,
      search,
      isActive,
      reset: () => {
        search.value = ''
        typeSelect.value = typeOptions.value[0]
        arbitraryPeriodFrom.value = ''
        arbitraryPeriodTo.value = ''
        periodSelect.value = periodSelectInitial
      }
    }
  },
  components: {
    AppSelect,
    AppArbitraryPeriod
  }
}
</script>

<style scoped>

</style>
