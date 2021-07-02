<template>
  <div class="table-responsive">
    <app-loader v-if="loader" />
    <table v-if="projects.length" class="table text-center align-middle table-borderless table-nowrap">
      <thead class="table-light">
        <tr>
          <th>
            <input class="form-check-input float-none" type="checkbox" value="">
          </th>
          <th>#</th>
          <th>Наименование</th>
          <th>Дата</th>
          <th class="no-wrap">Описание</th>
          <th>Тип операции</th>
          <th>Сумма</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projects" :key="project.id">
          <td>
            <input class="form-check-input float-none" type="checkbox" value="">
          </td>
          <td>{{ index + 1 }}</td>
          <td><router-link class="fw-medium link-dark text-decoration-none" :to="{name: 'Project', params: { id: project.id }}">{{ project.title }}</router-link></td>
          <td>{{ $dateF(project.date) }}</td>
          <td class="no-wrap" style="min-width: 380px">{{ project.desc }}</td>
          <td>
            <div class="badge bg-success">{{ project.type }}</div>
          </td>
          <td>{{ $currency(project.amount) }}</td>
          <td>
            <button class="btn btn-outline-primary btn-sm py-1 fz-12" type="button" @click="$router.push(`/project/${project.id}`)">Открыть</button>
            <button class="btn btn-sm text-danger ms-2 fz-16 p-0" type="button" title="Удалить">
              <svg class="icon icon-trash">
                <use xlink:href="#trash"></use>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="p-30 text-center fz-14 text-dark" v-else-if="!loader">Записей пока нет.</p>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import AppLoader from '@/components/ui/AppLoader'

export default {
  name: 'ProjectList',
  setup () {
    const loader = ref(true)
    const store = useStore()
    onMounted(async () => {
      await store.dispatch('project/load')
      loader.value = false
    })
    const projects = computed(() => store.getters['project/projects'])

    return {
      projects,
      loader
    }
  },
  components: {
    AppLoader
  }
}
</script>

<style scoped lang="scss">
  .table-responsive {
    min-height: 200px;
  }
</style>
