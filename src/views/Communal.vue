<template>
  <app-breadcrumb />

  <app-page title="Оплата коммунальных">
    <template #header>
      <div class="d-flex align-items-center">
        <app-button
          classListBtn="main__add-btn btn-primary shadow-sm-soft"
          :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#addCommunalForm' }"
          :icon="{ name: 'pencil-square', placement: 'prepend' }"
        >
          <span class="ms-2 d-sm-inline d-none">Добавить показания</span>
        </app-button>

        <app-button
          classListBtn="btn-outline-secondary ms-10 px-3"
          :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#communalSettingForm' }"
          :icon="{ name: 'gear', placement: 'prepend' }"
        >
          <span class="ms-1 d-none d-lg-inline">Тарифы</span>
        </app-button>
      </div>
    </template>

    <app-card :classList="['mb-30']">
      <template #header>
        <div class="row align-items-center">
          <div class="col-xxl mb-0 mb-xl-2 mb-xxl-0 d-flex align-items-center justify-content-between">
            <communal-list-header />
          </div>

          <div class="col-xxl-auto collapse d-xl-block" id="filter">
            <communal-filter />
          </div>
        </div>
      </template>

      <communal-list />

      <template #footer>
      <!-- <app-pagination-->
      <!-- :count="projects.length"-->
      <!-- :pages="PAGE_SIZE"-->
      <!-- v-model="page"-->
      <!-- @changeSize="changePageSize"-->
      <!-- />-->
      </template>
    </app-card>
  </app-page>
</template>

<script setup>
import CommunalListHeader from '@/components/communal/CommunalListHeader'
import CommunalFilter from '@/components/communal/CommunalFilter'
import CommunalList from '@/components/communal/CommunalList'

</script>

<style scoped>

</style>
