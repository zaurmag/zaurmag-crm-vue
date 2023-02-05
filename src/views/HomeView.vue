<template>
  <app-page-header title="Проекты">
    <template #header>
      <app-button
        class-list-btn="main__add-btn btn btn-primary shadow-sm-soft"
        :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#addRecord' }"
        :icon="{ name: 'pencil-square', placement: 'prepend' }"
      >
        <span class="d-sm-inline d-none ms-sm-2">Добавить запись</span>
      </app-button>
    </template>

    <app-card :class-list="['mb-30']">
      <template #header>
        <div class="row align-items-start align-items-md-center">
          <project-list-header
            :checkboxes="checkboxes"
            @remove="showBsModal('#confirmAllSelected')"
          />

          <div class="col-xl">
            <project-filter v-model="filter" />
          </div>
        </div>
      </template>

      <template #append>
        <project-list
          :projects="paginateItems"
          :loader="loader"
          :page-size="PAGE_SIZE.value"
          @selected="selectCheckboxes"
        />
      </template>

      <template #footer>
        <app-pagination
          v-model="page"
          :count="projects.length"
          :pages="PAGE_SIZE"
          @change-size="changePageSize"
        />
      </template>
    </app-card>

    <div class="row gy-30">
      <project-report :projects="projects" />
    </div>
  </app-page-header>

  <teleport to="body">
    <app-bs-modal
      id="addRecord"
      title="Добавить запись"
      :close="closeModal"
      @hide="closeModal = false"
      @show="showModalHandler"
    >
      <project-form @close="closeModal = true" />
    </app-bs-modal>

    <app-confirm
      id="confirmAllSelected"
      :title="'Вы удаляете ' + checkboxes.length + ' элемента'"
      text="Вы уверены? Операцию нельзя будет отменить."
      @resolve="removeAllConfirm"
    />
  </teleport>
</template>

<script setup>
import ProjectList from '@/components/project/ProjectList.vue'
import ProjectListHeader from '@/components/project/ProjectListHeader.vue'
import ProjectFilter from '@/components/project/ProjectFilter.vue'
import ProjectReport from '@/components/project/ProjectReport.vue'
import ProjectForm from '@/components/project/ProjectForm.vue'
import { useProductPaginate } from '@/use/product-paginate'
import { showBsModal, closeBsModal } from '@/use/bs-modal'
import { dateF } from '@/utils/date'
import { loader, toggleLoader } from '@/use/loader'
import { checkboxes, selectCheckboxes, resetCheckboxes } from '@/use/checkboxes'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const initialDateProject = ref(null)
const closeModal = ref(false)
const store = useStore()
const filter = ref({})
const PAGE_SIZE = 10
const projects = computed(() =>
  store.getters['project/projects']
    .filter(request => {
      if (filter.value.search) {
        return request.title.toLowerCase().includes(filter.value.search.toLowerCase())
      }

      return request
    })
    .filter(request => {
      if (filter.value.type) {
        return filter.value.type === request.type || filter.value.type === 'all'
      }

      return request
    })
    .filter(request => {
      if (filter.value.dateFrom && filter.value.dateTo) {
        const reqDate = dateF(request.date, { locale: 'fr-CA' })

        return (
          new Date(filter.value.dateFrom) <= new Date(reqDate) &&
          new Date(reqDate) <= new Date(filter.value.dateTo)
        )
      }

      return request
    })
)
const { page, paginateItems, changePageSize } = useProductPaginate(projects, PAGE_SIZE)
const removeAllConfirm = async () => {
  try {
    await store.dispatch('project/delete', checkboxes.value)
    await store.dispatch('project/load')
    resetCheckboxes()
  } catch (e) {
    /* empty */
  } finally {
    closeBsModal('#confirmAllSelected')
  }
}

const showModalHandler = () => {
  initialDateProject.value = {
    date: dateF(new Date(), { locale: 'sv-SE' })
  }
}

onMounted(async () => {
  try {
    await store.dispatch('project/load')
  } catch (e) {
    /* empty */
  } finally {
    toggleLoader(false)
  }
})
</script>
