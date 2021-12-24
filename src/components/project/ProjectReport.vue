<template>
  <div class="col-xl-6">
    <div class="card shadow-sm card__report">
      <header class="card-header d-flex align-items-center justify-content-between">
        <h5 class="card-header-title h6 mb-0">Отчет за период</h5>

        <div class="d-flex align-items-center justify-content-between">
          <div class="form-check me-3">
            <label class="form-check-label" for="onlyProfit">Только прибыль</label>
            <input class="form-check-input" type="checkbox" id="onlyProfit">
          </div>
          <AppSelect dopCls="select--styled" :options="reportOptions" @select="select" />
        </div>
      </header>
      <div class="card-body">
      </div>
    </div>
  </div>

  <div class="col-xl-6">
    <div class="card shadow-sm card__report">
      <header class="card-header">
        <h5 class="card-header-title h6 mb-0">Общий отчет</h5>
      </header>
      <div class="card-body">
        <h2 class="h3">{{ $currency(total) }}</h2>
        <div class="progress rounded-pill mb-2 opacity-75 fz-10" style="height: 10px">
          <div class="progress-bar bg-success" :style="'width:' + Math.round(+(income / total) * 100) + '%'">{{ Math.round(+(income / total) * 100) + '%' }}
          </div>
          <div class="progress-bar bg-danger" :style="'width:' + Math.round(+(outcome / total) * 100) + '%'">{{ Math.round(+(outcome / total) * 100) + '%' }}
          </div>
          <div v-if="pending > 0" class="progress-bar bg-warning" :style="'width:' + Math.round(+(pending / total) * 100) + '%'">{{ Math.round(+(pending / total) * 100) + '%' }}
          </div>
        </div>
        <div class="table-responsive mt-30">
          <table class="table table-nowrap card-table">
            <tbody>
            <tr>
              <th scope="row"><span class="indikator bg-success me-2"></span>Приход</th>
              <td>{{ $currency(income) }}</td>
              <td>
                <div class="badge bg-info opacity-75" v-tooltip="{title: 'По сравнению с прошлым мес.', placement: 'right'}">+ 12%</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="indikator bg-danger me-2"></span>Расход</th>
              <td>{{ $currency(outcome) }}</td>
              <td>
                <div class="badge bg-info opacity-75">- 5%</div>
              </td>
            </tr>
            <tr v-if="pending > 0">
              <th scope="row"><span class="indikator bg-warning me-2"></span>В ожидании</th>
              <td>{{ $currency(pending) }}</td>
              <td>
                <div class="badge bg-warning opacity-75">- 5%</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppSelect from '@/components/ui/AppSelect'

export default {
  name: 'ProjectReport',
  setup () {
    const store = useStore()
    const projects = computed(() => store.getters['project/projects'])
    const total = ref(0)
    const income = ref(0)
    const outcome = ref(0)
    const pending = ref(0)
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

    onMounted(async () => {
      await store.dispatch('project/load')

      total.value = projects.value.reduce((acc, item) => acc += +item.amount, 0)
      income.value = projects.value
        .filter(item => item.type === 'income')
        .reduce((acc, item) => acc += +item.amount, 0)

      outcome.value = projects.value
        .filter(item => item.type === 'outcome')
        .reduce((acc, item) => acc += +item.amount, 0)

      pending.value = projects.value
        .filter(item => item.type === 'pending')
        .reduce((acc, item) => acc += +item.amount, 0)
    })

    return {
      total,
      income,
      outcome,
      pending,
      select: value => {
        console.log(value)
      },
      reportOptions
    }
  },
  components: {
    AppSelect
  }
}
</script>

<style scoped>

</style>
