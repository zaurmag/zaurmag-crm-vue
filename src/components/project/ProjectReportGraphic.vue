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
import AppCard from '@/components/ui/AppCard.vue'
import ChartLine from '@/components/ui/ChartLine.vue'
import { computed, watch, ref } from 'vue'
import { MONTHS } from '@/constans'
import { getAmountByMonths, getMonthName } from '@/utils/report'
import { currency } from '@/utils/currency'

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
    const monthsRef = ref(MONTHS)

    watch(projects, items => {
      const income = items.filter(p => p.type === 'income')
      const outcome = items.filter(p => p.type === 'outcome')

      monthsRef.value = getMonthName(items, MONTHS)

      incomeAmount.value = getAmountByMonths(income, MONTHS)
      outcomeAmount.value = getAmountByMonths(outcome, MONTHS)
    })

    const chartTotalOptions = {
      backgroundColor: 'transparent',
      pointStyle: 'circle',
      borderWidth: 2,
      pointRadius: 3,
      pointBorderColor: '#fff',
      pointHoverRadius: 4,
      cubicInterpolationMode: 'monotone'
    }

    const chartData = computed(() => {
      return {
        labels: monthsRef.value,
        datasets: [{
          label: 'Приход',
          data: incomeAmount.value,
          hoverBorderColor: '#377dff',
          pointBackgroundColor: '#377dff',
          borderColor: '#377dff',
          ...chartTotalOptions
        },
        {
          label: 'Расход',
          data: outcomeAmount.value,
          borderColor: '#00c9db',
          hoverBorderColor: '#00c9db',
          pointBackgroundColor: '#00c9db',
          ...chartTotalOptions
        }]
      }
    })

    const chartOptions = computed(() => {
      return {
        responsive: true,
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            title: {
              display: false,
              text: 'Месяцы'
            }
          },
          y: {
            display: true,
            title: {
              display: false,
              text: 'Суммы'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label (context) {
                let label = context.dataset.label || ''

                if (label) {
                  label += ': '
                }

                if (context.parsed.y) {
                  label += currency(context.parsed.y)
                }

                return label
              }
            }
          }
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
