<template>
  <AppCard v-if="total" title="Общий отчет">
    <h2 class="h3">{{ $currency(total) }}</h2>
    <div
      class="progress rounded-pill mb-2 opacity-75 fz-10"
      style="height: 10px"
    >
      <div
        class="progress-bar bg-success"
        :style="'width:' + incomeProgress"
      >
        {{ incomeProgress }}
      </div>
      <div
        class="progress-bar bg-danger"
        :style="'width:' + outcomeProgress"
      >
        {{ outcomeProgress }}
      </div>
      <div
        v-if="pending > 0"
        class="progress-bar bg-warning"
        :style="'width:' + pendingProgress"
      >
        {{ pendingProgress }}
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
            Доход
          </th>
          <td><strong>{{ $currency(profit) }}</strong></td>
        </tr>
        </tbody>
      </table>
    </div>
  </AppCard>
</template>

<script>
import AppCard from '@/components/ui/AppCard'
import { computed, ref, watch } from 'vue'
import { getAmountSumm, progress, getSumm } from '@/utils/report'

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
    const incomeProgress = ref()
    const outcomeProgress = ref()
    const pendingProgress = ref()
    const projects = computed(() => props.items)

    watch(projects, value => {
      total.value = getSumm(value)

      income.value = getAmountSumm('income', projects.value)
      outcome.value = getAmountSumm('outcome', projects.value)
      pending.value = getAmountSumm('pending', projects.value)
      profit.value = income.value - outcome.value

      incomeProgress.value = progress(income.value, total.value)
      outcomeProgress.value = progress(outcome.value, total.value)
      pendingProgress.value = progress(pending.value, total.value)
    })

    return {
      total,
      income,
      outcome,
      pending,
      profit,
      incomeProgress,
      outcomeProgress,
      pendingProgress
    }
  },
  components: {
    AppCard
  }
}
</script>

<style scoped>

</style>
