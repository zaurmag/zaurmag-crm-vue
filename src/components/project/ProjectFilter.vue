<template>
  <div class="form form--filter row align-items-end gy-2">
    <div class="col-xl-auto">
      <div class="row align-items-center g-4">
        <div class="col-sm col-md-auto">
<!--          <AppSelect-->
<!--            :options="periodOptions"-->
<!--            placeholder="Выбрать период"-->
<!--            @select="periodSelect"-->
<!--            :reset="!period"-->
<!--          />-->
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
<!--        <AppSelect-->
<!--          :options="typeOptions"-->
<!--          :current="!type ? typeOptions[0] : null"-->
<!--          @select="typeSelect"-->
<!--        />-->
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
import { options } from '@/utils/filter-period'
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
    const periodOptions = ref(options)
    const periodSelect = ref(periodSelectInitial)

    const typeOptions = ref([
      {
        name: 'Все',
        value: 'all'
      },
      {
        name: 'Приход',
        value: 'income'
      },
      {
        name: 'Расход',
        value: 'outcome'
      },
      {
        name: 'В ожидании',
        value: 'pending'
      }
    ])
    const type = ref()

    const search = ref()

    const arbitraryPeriodFromReset = () => {
      arbitraryPeriodFrom.value = ''
      arbitraryPeriodTo.value = ''
    }

    watch([search, type], ([search, type]) => {
      emit('update:modelValue', { search, type })
    })

    watch([arbitraryPeriodFrom, arbitraryPeriodTo], ([periodFrom, periodTo]) => {
      if (periodFrom && periodTo) {
        emit('update:modelValue', { periodFrom, periodTo })
      }
    })

    watch(periodSelect, period => {
      const periodFrom = getDateFromPeriod(period.value, true)
      const periodTo = dateF(Date.now(), { locale: 'fr-CA' })

      if (period.value) {
        arbitraryPeriodFromReset()

        arbitraryPeriodFrom.value = periodFrom
        arbitraryPeriodTo.value = periodTo
      }

      emit('update:modelValue', {
        periodFrom: arbitraryPeriodFrom.value,
        periodTo: arbitraryPeriodTo.value
      })
    })

    const arbitraryPeriodDates = dates => {
      const rDate = relativeDate(dates.from, dates.to)
      const option = periodOptions.value.find(item => item.value === rDate)

      if (option) {
        periodSelect.value = {
          name: option.name,
          value: option.value
        }
      }
    }

    const isActive = computed(() => search.value || type.value || periodSelect.value || arbitraryPeriodFrom.value || arbitraryPeriodTo)

    return {
      arbitraryPeriodFrom,
      arbitraryPeriodTo,
      arbitraryPeriodDates,
      periodSelect,
      periodOptions,
      typeOptions,
      search,
      type,
      isActive,
      reset: () => {
        search.value = ''
        type.value = null
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
