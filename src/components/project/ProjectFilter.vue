<template>
  <div class="form form--filter row align-items-end gy-2">
    <div class="col-xl-auto">
      <div class="row align-items-center g-3 g-lg-0">
        <div class="col-sm-2 col-md-auto">
          <label class="form__label me-3" for="filterDateFrom">Период:</label>
        </div>
        <div class="col-sm-5 col-md-auto d-flex align-items-center">
          <label class="text-secondary me-2">от:</label>
          <input class="form__control" id="filterDateFrom" type="date" v-model="periodFrom">
        </div>
        <div class="col-sm-5 col-md-auto d-flex align-items-center">
          <label class="form__label me-2" for="filterDateTo">до:</label>
          <input class="form__control" id="filterDateTo" type="date" v-model="periodTo">
        </div>
      </div>
    </div>
    <div class="col-xl-auto">
      <div class="d-flex align-items-center">
        <label class="form__label me-3">Тип операции:</label>
        <AppSelect :options="periodOptions" :current="!type ? periodOptions[0] : null" @select="select" />
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
import { ref, watch, computed } from 'vue'
import AppSelect from '@/components/ui/AppSelect'

export default {
  name: 'ProjectFilter',
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup (_, { emit }) {
    const periodOptions = ref([
      {
        name: 'Все',
        value: 'Все'
      },
      {
        name: 'Приход',
        value: 'Приход'
      },
      {
        name: 'Расход',
        value: 'Расход'
      },
      {
        name: 'В ожидании',
        value: 'В ожидании'
      }
    ])
    const search = ref()
    const type = ref()
    const periodFrom = ref()
    const periodTo = ref()

    const select = (value) => {
      type.value = value
    }

    watch([search, type, periodFrom, periodTo], values => {
      emit('update:modelValue', {
        search: values[0],
        type: values[1],
        periodFrom: values[2],
        periodTo: values[3]
      })
    })

    const isActive = computed(() => search.value || type.value || periodFrom.value || periodTo.value)

    watch(type, value => {
      console.log(value)
    })

    console.log(type.value)

    return {
      periodOptions,
      search,
      type,
      periodFrom,
      periodTo,
      isActive,
      select,
      reset: () => {
        search.value = ''
        type.value = ''
        periodFrom.value = ''
        periodTo.value = ''
      }
    }
  },
  components: {
    AppSelect
  }
}
</script>

<style scoped>

</style>
