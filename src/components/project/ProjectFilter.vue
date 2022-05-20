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
          <AppArbitraryPeriod v-model="arbitraryPeriod" @datesOut="arbitraryPeriodOut" />
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
import { getPeriodLater, dateF, relativeDate } from '@/utils/date'
import AppSelect from '@/components/ui/AppSelect'
import AppArbitraryPeriod from '@/components/ui/AppArbitraryPeriod'

export default {
  name: 'ProjectFilter',
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup (_, { emit }) {
    const PERIOD_PLACEHOLDER = 'Выбрать период'
    const arbitraryPeriod = ref({})
    const periodOptions = ref(options)
    const periodSelect = ref({ name: PERIOD_PLACEHOLDER })
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
    const arbitraryPeriodOut = date => {
      if (date) {
        emit('update:modelValue', {
          periodFrom: date.from,
          periodTo: date.to
        })

        const value = relativeDate(date.from, date.to)
        const name = options.find(option => option.value === value)?.name

        periodSelect.value = {
          name: name || PERIOD_PLACEHOLDER,
          value: value || ''
        }

        return date
      }
    }

    watch([search, type, periodSelect], values => {
      const dataValue = {
        search: values[0],
        type: values[1]
      }

      if (values[2].value) {
        const from = getPeriodLater(values[2].value, true)
        const to = dateF(Date.now(), { locale: 'fr-CA' })

        arbitraryPeriod.value = {
          from: values[2].value === 'today' ? to : from,
          to
        }

        dataValue.periodFrom = from
        dataValue.periodTo = to
      }

      console.log(dataValue, arbitraryPeriodOut())

      emit('update:modelValue', dataValue)
    })

    const isActive = computed(() => search.value || type.value || periodSelect.value || arbitraryPeriod.value)

    return {
      periodSelect,
      arbitraryPeriod,
      arbitraryPeriodOut,
      periodOptions,
      typeOptions,
      search,
      type,
      isActive,
      reset: () => {
        search.value = ''
        type.value = null
        arbitraryPeriod.value = {}
        periodSelect.value = { name: PERIOD_PLACEHOLDER, value: '' }
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
