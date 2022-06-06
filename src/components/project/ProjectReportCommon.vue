<template>
  <AppCard title="Общий отчет">
    <h2 class="h3">{{ $currency(total) }}</h2>
    <div
      class="progress rounded-pill mb-2 opacity-75 fz-10"
      style="height: 10px"
    >
      <div
        class="progress-bar bg-success"
        :style="'width:' + Math.round(+(income / total) * 100) + '%'"
      >
        {{ Math.round(+(income / total) * 100) + '%' }}
      </div>
      <div
        class="progress-bar bg-danger"
        :style="'width:' + Math.round(+(outcome / total) * 100) + '%'"
      >
        {{ Math.round(+(outcome / total) * 100) + '%' }}
      </div>
      <div
        v-if="pending > 0"
        class="progress-bar bg-warning"
        :style="'width:' + Math.round(+(pending / total) * 100) + '%'"
      >
        {{ Math.round(+(pending / total) * 100) + '%' }}
      </div>
    </div>
    <div class="table-responsive mt-30">
      <table class="table table-nowrap card-table">
        <tbody>
        <tr v-if="income">
          <th scope="row">
            <span class="indikator bg-success me-2"></span>
            Приход
          </th>
          <td>{{ $currency(income) }}</td>
        </tr>
        <tr v-if="outcome">
          <th scope="row">
            <span class="indikator bg-danger me-2"></span>
            Расход
          </th>
          <td>{{ $currency(outcome) }}</td>
        </tr>
        <tr v-if="pending">
          <th scope="row">
            <span class="indikator bg-warning me-2"></span>
            В ожидании
          </th>
          <td>{{ $currency(pending) }}</td>
        </tr>
        <tr v-if="income && outcome">
          <th scope="row">
            <span class="indikator bg-primary me-2"></span>
            Чистый доход
          </th>
          <td><strong>{{ $currency(profit) }}</strong></td>
        </tr>
        </tbody>
      </table>
    </div>
  </AppCard>
</template>

<script>
import { computed, ref, watch } from 'vue'
import AppCard from '@/components/ui/AppCard'

export default {
  name: 'ProjectReportCommon',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const total = ref(0)
    const income = ref(0)
    const outcome = ref(0)
    const pending = ref(0)
    const profit = ref(0)
    const projects = computed(() => props.items)

    const getValue = type => {
      return projects.value
        .filter((item) => item.type === type)
        .reduce((acc, item) => {
          acc += +item.amount

          return acc
        }, 0)
    }

    watch(projects, val => {
      total.value = projects.value.reduce((acc, item) => {
        acc += +item.amount

        return acc
      }, 0)

      income.value = getValue('income')
      outcome.value = getValue('outcome')
      pending.value = getValue('pending')
      profit.value = income.value - outcome.value
    })

    return {
      total,
      income,
      outcome,
      pending,
      profit
    }
  },
  components: {
    AppCard
  }
}
</script>

<style scoped>

</style>
