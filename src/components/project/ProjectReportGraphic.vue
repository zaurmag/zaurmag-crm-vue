<template>
  <app-card title="Доходы / Расходы">
    <ChartLine
      :chart-data="chartData"
      :chart-options="chartOptions"
      :width="400"
      :height="200"
    />
  </app-card>
</template>

<script>
import AppCard from '@/components/ui/AppCard'
import ChartLine from '@/components/ui/ChartLine'
import { computed, watch, ref } from 'vue'
import { months } from '@/constans'
import { getAmountByMonths, getMonthName } from '@/utils/report'

export default {
  name: 'ProjectReportGraphic',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup (props) {
    const projects = computed(() => props.items)
    const incomeAmount = ref()
    const outcomeAmount = ref()
    const monthsRef = ref(months)

    watch(projects, items => {
      const income = items.filter(p => p.type === 'income')
      const outcome = items.filter(p => p.type === 'outcome')

      monthsRef.value = getMonthName(items, months)

      incomeAmount.value = getAmountByMonths(income, months)
      outcomeAmount.value = getAmountByMonths(outcome, months)
    })

    const chartData = computed(() => {
      return {
        labels: monthsRef.value,
        datasets: [{
          label: 'Приход',
          data: incomeAmount.value,
          backgroundColor: 'transparent',
          borderColor: '#377dff',
          borderWidth: 2,
          pointRadius: 0,
          hoverBorderColor: '#377dff',
          pointBackgroundColor: '#377dff',
          pointBorderColor: '#fff',
          pointHoverRadius: 0
        },
        {
          label: 'Расход',
          data: outcomeAmount.value,
          backgroundColor: 'transparent',
          borderColor: '#00c9db',
          borderWidth: 2,
          pointRadius: 0,
          hoverBorderColor: '#00c9db',
          pointBackgroundColor: '#00c9db',
          pointBorderColor: '#fff',
          pointHoverRadius: 0
        }]
      }
    })

    const chartOptions = computed(() => {
      return {
        responsive: true,
        tooltips: {
          prefix: '$',
          postfix: 'k',
          hasIndicator: true,
          mode: 'index',
          intersect: false,
          lineMode: true,
          lineWithLineColor: 'rgba(19, 33, 68, 0.075)'
        },
        hover: {
          mode: 'nearest',
          intersect: true
        }
      }
    })

    return {
      chartData,
      chartOptions
    }
  },
  components: {
    AppCard,
    ChartLine
  }
}
</script>

<style scoped>

</style>
