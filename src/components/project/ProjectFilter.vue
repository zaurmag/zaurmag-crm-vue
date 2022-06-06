<template>
  <div class="form form--filter row align-items-end gy-2">
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
    <div class="col-xl">
      <div class="d-flex align-items-center">
        <div class="form__group form__group--icon">
          <svg class="icon icon-search">
            <use xlink:href="#search"></use>
          </svg>
          <input class="form__control" type="search" placeholder="Поиск по наименованию" v-model="search">
        </div>
        <button
          class="btn btn-sm ms-2 text-success"
          type="button"
          v-if="isActive"
          v-tooltip="{title: 'Сбросить фильтр', placement: 'right'}"
          @click="reset"
        >
          <svg class="icon icon-x-circle">
            <use xlink:href="#x-circle"></use>
          </svg>
        </button>
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

    const periodSelectInitial = { name: 'Выбрать период', value: '' }
    const periodOptions = ref(PERIOD_OPTIONS)
    const periodSelect = ref(periodSelectInitial)

    const typeOptions = ref(TYPE_OPTIONS)
    const typeSelect = ref(typeOptions.value[0])

    const search = ref()

    const arbitraryPeriodFromReset = () => {
      arbitraryPeriodFrom.value = ''
      arbitraryPeriodTo.value = ''
    }

    watch([
      search,
      typeSelect,
      arbitraryPeriodFrom,
      arbitraryPeriodTo,
      periodSelect
    ], ([search, type, apFrom, apTo, periodSelect]) => {
      const periodFrom = getDateFromPeriod(periodSelect.value, true)
      const periodTo = dateF(Date.now(), { locale: 'fr-CA' })

      if (periodSelect.value) {
        arbitraryPeriodFromReset()

        arbitraryPeriodFrom.value = periodFrom
        arbitraryPeriodTo.value = periodTo
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

      if (!rDate) {
        periodSelect.value = periodSelectInitial
      }

      if (option) {
        periodSelect.value = {
          name: option.name,
          value: option.value
        }
      }
    }

    const isActive = computed(() => search.value || typeSelect.value || periodSelect.value || arbitraryPeriodFrom.value || arbitraryPeriodTo)

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
        arbitraryPeriodFromReset()
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
