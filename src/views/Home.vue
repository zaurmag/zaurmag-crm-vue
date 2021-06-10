<template>
  <app-page title="Главная панель">
    <template #header>
      <button class="main__add-btn btn btn-primary px-md-3 ms-auto" type="button" data-bs-toggle="modal" data-bs-target="#addRecordForm"><span class="d-sm-inline d-none">Добавить</span>
        <svg class="icon icon-plus-lg ms-sm-1">
          <use xlink:href="#plus-lg"></use>
        </svg>
      </button>
    </template>

    <div class="card shadow-sm mb-30">
      <header class="card-header">
        <div class="row align-items-center">
          <div class="col-xxl mb-2 mb-xxl-0 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <h5 class="h6 mb-0 card-header-title">Список проектов</h5>
              <div class="text-secondary fz-14 ms-3">5 элементов</div>
              <button class="btn btn-outline-danger btn-sm ms-2" type="button">
                <svg class="icon icon-trash me-1">
                  <use xlink:href="#trash"></use>
                </svg>
                Удалить
              </button>
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

      <project-list />

      <footer class="card-footer">
        <app-pagination />
      </footer>
    </div>

    <div class="row gy-30">
      <project-report />
    </div>
  </app-page>
</template>

<script>
import ProjectList from '@/components/project/ProjectList'
import AppPagination from '@/components/ui/AppPagination'
import AppPage from '@/components/ui/AppPage'
import ProjectFilter from '@/components/project/ProjectFilter'
import ProjectReport from '@/components/project/ProjectReport'

export default {
  name: 'Home',
  components: {
    AppPage,
    ProjectList,
    AppPagination,
    ProjectFilter,
    ProjectReport
  }
}
</script>
