<template>
  <div class="card shadow-sm card__report">
    <header class="card-header d-flex align-items-center justify-content-between">
      <h5 class="card-header-title h6 mb-0">Отчет за период</h5>

      <div class="d-flex align-items-center justify-content-between">
        <div class="form-check me-3">
          <label class="form-check-label" for="onlyProfit">Только прибыль</label>
          <input class="form-check-input" type="checkbox" id="onlyProfit" />
        </div>
        <AppSelect
          dopCls="select--styled"
          :options="reportOptions"
          @select="select"
        />
      </div>
    </header>
    <div class="card-body"></div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import AppSelect from '@/components/ui/AppSelect'
import { useStore } from 'vuex'
// import { dateF } from '@/utils/date'

export default {
  name: 'ProjectReportPeriod',
  setup () {
    const store = useStore()
    const projects = computed(() => store.getters['project/projects'])
    const reportOptions = ref([
      {
        name: 'Сегодня',
        value: 'today'
      },
      {
        name: 'Вчера',
        value: 'yesterday'
      },
      {
        name: 'За последние 7 дней',
        value: 'last-7'
      },
      {
        name: 'За последние 30 дней',
        value: 'last-30'
      },
      {
        name: 'В текущем мес.',
        value: 'this-month'
      },
      {
        name: 'За последний мес.',
        value: 'last-month'
      },
      {
        name: 'Произвольный период',
        value: 'custom-range'
      }
    ])

    // const periodMap = {
    //   today: dateF(Date.now(), {
    //     locale: 'fr-CA'
    //   })
    // }

    // console.log(periodMap.today, periodMap.yesterday)

    onMounted(async () => {
      await store.dispatch('project/load')
    })

    return {
      reportOptions,
      select: (value) => {
        console.log(value, projects.value)
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
