<template>
  <app-page title="Проекты">
    <template #header>
      <button
        class="main__add-btn btn btn-primary shadow-sm-soft"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addRecord"
      >
        <app-icon name="pencil-square" classList="me-sm-2" />
        <span class="d-sm-inline d-none">Добавить запись</span>
      </button>
    </template>

    <app-card :classList="['mb-30']">
      <template #header>
        <div class="row align-items-center">
          <div class="col-xxl mb-0 mb-xl-2 mb-xxl-0 d-flex align-items-center justify-content-between">
            <project-list-header
              :checkboxes="checkboxes"
              @remove="removeAll"
            />
          </div>

          <div class="col-xxl-auto d-xl-block collapse" id="filter">
            <project-filter v-model="filter" />
          </div>
        </div>
      </template>

      <template #append>
        <project-list
          :projects="paginateItems"
          :loader="loader"
          :pageSize="PAGE_SIZE.value"
          @selected="selectChbx"
        />
      </template>

      <template #footer>
        <app-pagination
          :count="projects.length"
          :pages="PAGE_SIZE"
          v-model="page"
          @changeSize="changePageSize"
        />
      </template>
    </app-card>

    <div class="row gy-30">
      <project-report :projects="projects" />
    </div>
  </app-page>

  <teleport to="body">
    <app-bs-modal id="addRecord" title="Добавить запись">
      <project-form @close="closeModal('#addRecord')" />
    </app-bs-modal>

    <app-confirm
      ref="confirm"
      :title="'Вы удаляете ' + checkboxes.length + ' элемента'"
      text="Вы уверены? Операцию нельзя будет отменить."
      @resolve="removeAllConfirm"
    />
  </teleport>
</template>

<script>
import ProjectList from '@/components/project/ProjectList'
import ProjectListHeader from '@/components/project/ProjectListHeader'
import ProjectFilter from '@/components/project/ProjectFilter'
import ProjectReport from '@/components/project/ProjectReport'
import ProjectForm from '@/components/project/ProjectForm'
import { useProductPaginate } from '@/use/product-paginate'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { closeModal } from '@/use/bs-modal'

export default {
  name: 'Home',
  setup () {
    const loader = ref(true)
    const confirm = ref(false)
    const checkboxes = ref([])
    const store = useStore()
    const filter = ref({})
    const PAGE_SIZE = ref({ name: 10, value: 10 })
    const projects = computed(() => store.getters['project/projects']
      .filter(request => {
        if (filter.value.search) {
          return request.title.toLowerCase().includes(filter.value.search.toLowerCase())
        }

        return request
      })
      .filter(request => {
        if (filter.value.type?.value) {
          return filter.value.type.value === request.type || filter.value.type.value === 'all'
        }

        return request
      })
      .filter(request => {
        if (filter.value.periodFrom && filter.value.periodTo) {
          return new Date(filter.value.periodFrom) <= new Date(request.date) && new Date(request.date) <= new Date(filter.value.periodTo)
        }

        return request
      })
    )

    const selectChbx = checkboxIds => {
      checkboxes.value = checkboxIds
    }

    const removeAll = () => {
      confirm.value.confirm = true
    }

    const removeAllConfirm = async () => {
      try {
        await store.dispatch('project/delete', checkboxes.value)
        await store.dispatch('project/load')
        confirm.value.confirm = false
        checkboxes.value = []
      } catch (e) {}
    }

    onMounted(async () => {
      await store.dispatch('project/load')
      loader.value = false
    })

    return {
      loader,
      selectChbx,
      closeModal,
      checkboxes,
      removeAll,
      removeAllConfirm,
      confirm,
      PAGE_SIZE,
      projects,
      filter,
      ...useProductPaginate(projects, PAGE_SIZE)
    }
  },
  components: {
    ProjectList,
    ProjectListHeader,
    ProjectFilter,
    ProjectReport,
    ProjectForm
  }
}
</script>
