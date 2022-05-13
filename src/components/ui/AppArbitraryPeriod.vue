<template>
  <div class="dropdown">
    <a
      href="#"
      class="dropdown-toggle btn btn-outline-secondary px-3 btn-sm"
      data-bs-toggle="dropdown"
    >{{ text }}</a>

    <div class="dropdown-menu p-3">
      <div class="col-sm col-md-auto d-flex align-items-center">
        <label class="text-secondary me-2">от:</label>
        <input class="form__control" id="filterDateFrom" type="date" v-model="date.from">
      </div>

      <div class="col-sm col-md-auto d-flex align-items-center">
        <label class="form__label me-2" for="filterDateTo">до:</label>
        <input class="form__control" id="filterDateTo" type="date" v-model="date.to">
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { textRangePeriod } from '@/utils/filter-period'
// import { fpMap } from '@/utils/filter-period'
// import { dateF } from '@/utils/date'

export default {
  name: 'AppArbitraryPeriod',
  emits: ['update:modelValue'],
  props: ['modelValue'],
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup (props, { emit }) {
    // const period = ref(modelValue.period)
    // const dateFrom = ref(modelValue.dateFrom)
    // const date = ref({
    //   from: mValue.value.dateFrom,
    //   to: mValue.value.dateTo
    // })
    // const dateTo = ref(modelValue.dateTo)
    const from = ref()
    const to = ref()
    const text = ref('Произвольно')
    const date = computed({
      get: () => props.modelValue,
      set: value => emit('update:modelValue', value)
    })

    watch(date, ({ period }) => {
      text.value = textRangePeriod(period)
    })

    watch([from, to], ([from, to]) => {
      console.log(from, to)
    })

    // watch(date, values => {
    //   if (values[0] && values[1]) {
    //     emit('update:modelValue', 'period')
    //   }
    //
    //   console.log(values)
    // })

    // const modelVal = computed(() => props.modelValue)

    // watch(mValue, value => {
    //   console.log(value)
    // })

    // computed({
    //   get: () => modelValue.dateFrom,
    //   set: value => {
    //     console.log(value)
    //     date.value.from = value.dateFrom
    //     emit('update:modelValue', date.value.from)
    //   }
    // })
    //
    // computed({
    //   get: () => modelValue.dateTo,
    //   set: value => {
    //     console.log(value)
    //     date.value.to = value.dateTo
    //     emit('update:modelValue', date.value.to)
    //   }
    // })

    // watch([period, date], ([period, df, dt]) => {
    //   text.value = textRangePeriod(period)
    // })

    return {
      text,
      // dateFrom,
      // dateTo,
      date,
      from,
      to
    }
  }
}
</script>

<style scoped>

</style>
