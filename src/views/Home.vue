<template>
  <app-page title="Главная панель">
    <template #header>
      <button class="main__add-btn btn btn-primary px-md-3 ms-auto" type="button" @click="openModal">
        <span class="d-sm-inline d-none">Добавить</span>
        <svg class="icon icon-plus-lg ms-sm-1">
          <use xlink:href="#plus-lg"></use>
        </svg>
      </button>
    </template>

    <div class="card shadow-sm mb-30" style="min-height: 300px">
      <app-loader v-if="loader" />
      <template v-else>
        <header class="card-header">
          <div class="row align-items-center">
            <div class="col-xxl mb-2 mb-xxl-0 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <h5 class="h6 mb-0 card-header-title">Список проектов</h5>
                <template v-if="checkboxes.length">
                  <div class="text-secondary fz-14 ms-3">Отмечено {{ checkboxes.length }} элементов</div>
                  <button class="btn btn-outline-danger btn-sm ms-2" type="button" @click="removeAll">
                    <svg class="icon icon-trash me-1">
                      <use xlink:href="#trash"></use>
                    </svg>
                    Удалить
                  </button>
                </template>
              </div>
              <button class="btn btn-light d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#filter" aria-expanded="false">
                <svg class="icon icon-sliders">
                  <use xlink:href="#sliders"></use>
                </svg>
              </button>
            </div>
            <div class="col-xxl-auto collapse d-xl-block" id="filter">
              <project-filter />
            </div>
          </div>
        </header>

        <project-list :projects="paginateProducts" @selected="selectChbx" />

        <footer class="card-footer">
          <app-pagination :count="projects.length" :pages="PAGE_SIZE" v-model="page" @changeSize="changePageSize" />
        </footer>
      </template>
    </div>

    <div class="row gy-30">
      <project-report />
    </div>
  </app-page>

  <teleport to="body">
    <app-modal ref="modal" title="Добавить запись">
      <project-form @close="closeModal" />
    </app-modal>

    <app-confirm
      ref="confirm"
      :title="'Вы удаляете ' + checkboxes.length + ' элемента'"
      text="Вы уверены? Операцию нельзя будет отменить."
      @resolve="removeAllConfirm"
    />
  </teleport>
</template>

<script>
import AppLoader from '@/components/ui/AppLoader'
import AppModal from '@/components/ui/AppModal'
import AppConfirm from '@/components/ui/AppConfirm'
import AppPagination from '@/components/ui/AppPagination'
import AppPage from '@/components/ui/AppPage'
import ProjectList from '@/components/project/ProjectList'
import ProjectFilter from '@/components/project/ProjectFilter'
import ProjectReport from '@/components/project/ProjectReport'
import ProjectForm from '@/components/project/ProjectForm'
import { useProductPaginate } from '@/use/product-paginate'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup () {
    const loader = ref(true)
    const modal = ref(false)
    const confirm = ref(false)
    const checkboxes = ref([])
    const store = useStore()
    const PAGE_SIZE = ref(4)
    const projects = computed(() => store.getters['project/projects'])

    const openModal = () => {
      modal.value.modal = true
    }

    const closeModal = () => {
      modal.value.modal = false
    }

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
      modal,
      openModal,
      closeModal,
      selectChbx,
      checkboxes,
      removeAll,
      removeAllConfirm,
      confirm,
      PAGE_SIZE,
      projects,
      ...useProductPaginate(projects, PAGE_SIZE)
    }
  },
  components: {
    AppPage,
    ProjectList,
    AppPagination,
    ProjectFilter,
    ProjectReport,
    AppModal,
    AppConfirm,
    ProjectForm,
    AppLoader
  }
}
</script>
