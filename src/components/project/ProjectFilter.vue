<template>
  <div class="form form--filter row align-items-end gy-2">
    <div class="col-xl-auto">
      <div class="row align-items-center g-4">
        <div class="col-sm col-md-auto">
          <AppSelect
            :options="periodOptions"
            placeholder="Выбрать период"
            @select="periodSelect"
            :reset="!period"
          />
        </div>
        <div class="col-sm">
          <AppArbitraryPeriod v-model="arbitraryPeriod" @datesOut="arbitraryPeriodOut" />
        </div>
      </div>
    </div>
    <div class="col-xl-auto">
      <div class="d-flex align-items-center">
        <label class="form__label me-3">Тип операции:</label>
        <AppSelect
          :options="typeOptions"
          :current="!type ? typeOptions[0] : null"
          @select="typeSelect"
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
import { options, fpMap } from '@/utils/filter-period'
import { ref, watch, computed } from 'vue'
import { getPeriodLater, dateF } from '@/utils/date'
import AppSelect from '@/components/ui/AppSelect'
import AppArbitraryPeriod from '@/components/ui/AppArbitraryPeriod'

export default {
  name: 'ProjectFilter',
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup (_, { emit }) {
    const arbitraryPeriod = ref({})
    const period = ref()
    const periodOptions = ref(options)
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
    const periodMap = fpMap()
    const arbitraryPeriodOut = date => {
      period.value = ''
      emit('update:modelValue', {
        periodFrom: date.from,
        periodTo: date.to
      })
    }

    watch([search, type, period, arbitraryPeriod], values => {
      emit('update:modelValue', {
        search: values[0],
        type: values[1],
        periodFrom: values[3]?.from,
        periodTo: values[3]?.to,
        period: periodMap[values[2]?.value]
      })
    })

    const isActive = computed(() => search.value || type.value || period.value || arbitraryPeriod.value)

    return {
      arbitraryPeriod,
      arbitraryPeriodOut,
      periodOptions,
      typeOptions,
      period,
      search,
      type,
      isActive,
      typeSelect: value => {
        type.value = value
      },
      periodSelect: option => {
        period.value = option
        const from = getPeriodLater(option.value, true)
        const to = dateF(Date.now(), { locale: 'fr-CA' })

        arbitraryPeriod.value = {
          // period: option.value,
          from: option.value === 'today' ? to : from,
          to
        }
      },
      reset: () => {
        search.value = ''
        type.value = null
        arbitraryPeriod.value = {}
        period.value = ''
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
