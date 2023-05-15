<template>
  <app-page-header title="Финансы">
    <template #header>
      <app-button
        class-list-btn="btn btn-primary shadow-sm-soft px-3"
        :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#addRecord' }"
        :icon="{ name: 'pencil-square', placement: 'prepend' }"
      >
        <span class="d-sm-inline d-none ms-sm-2">Добавить запись</span>
      </app-button>
    </template>

    <app-card class="mb-30">
      <template #header>
        <div class="row align-items-start align-items-md-center">
          <finance-list-header
            :checkboxes="checkboxes"
            @remove="showBsModal('#confirmAllSelected')"
          />

          <div class="col-xl">
            <finance-filter v-model="filterItems" />
          </div>
        </div>
      </template>

      <template #append>
        <finance-list
          :projects="paginateItems"
          :loader="loader"
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
      <finance-report :projects="projects" />
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
      <finance-form @close="closeModal = true" />
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
import FinanceList from '../components/FinanceList.vue'
import FinanceListHeader from '../components/FinanceListHeader.vue'
import FinanceFilter from '../components/FinanceFilter.vue'
import FinanceReport from '../components/FinanceReport.vue'
import FinanceForm from '../components/FinanceForm.vue'
import { useProductPaginate } from '@/use/paginate'
import { showBsModal, closeBsModal } from '@/use/bs-modal'
import { dateF } from '@/utils/date'
import { loader, toggleLoader } from '@/use/loader'
import { checkboxes, selectCheckboxes, resetCheckboxes } from '@/use/checkboxes'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'

const initialDateProject = ref(null)
const closeModal = ref(false)
const store = useStore()
const filterItems = ref({})
const PAGE_SIZE = 10
const projects = computed(() =>
  store.getters['project/projects']
    .filter(request => {
      if (filterItems.value.search) {
        return request.title.toLowerCase().includes(filterItems.value.search.toLowerCase())
      }

      return request
    })
    .filter(request => {
      if (filterItems.value.type) {
        return filterItems.value.type === request.type || filterItems.value.type === 'all'
      }

      return request
    })
    .filter(request => {
      if (filterItems.value.dateFrom && filterItems.value.dateTo) {
        const reqDate = dateF(request.date, { locale: 'fr-CA' })

        return (
          new Date(filterItems.value.dateFrom) <= new Date(reqDate) &&
          new Date(reqDate) <= new Date(filterItems.value.dateTo)
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
