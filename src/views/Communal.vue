<template>
  <app-breadcrumb />

  <app-page title="Оплата коммунальных">
    <template #header>
      <div class="d-flex align-items-center">
        <app-button
          classListBtn="main__add-btn btn-primary shadow-sm-soft"
          :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#addCommunalRecord' }"
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

      <communal-list
        :items="items"
        :loader="loader"
      />

    <!-- <template #footer>-->
      <!-- <app-pagination-->
      <!-- :count="projects.length"-->
      <!-- :pages="PAGE_SIZE"-->
      <!-- v-model="page"-->
      <!-- @changeSize="changePageSize"-->
      <!-- />-->
    <!-- </template>-->
    </app-card>
  </app-page>

  <teleport to="body">
    <app-bs-modal
      id="addCommunalRecord"
      title="Добавить показания счетчиков"
      :close="closeModal"
      @hide="closeModal = false"
      classListWrapper="modal-lg"
    >
      <communal-form
        :current-initial="currentInitial"
        :prev-initial="prevInitial"
        @close="closeModal = true"
      />
<!--      <app-loader-row-placeholder v-else rows="15" cols="5" />-->
    </app-bs-modal>

    <!-- <app-confirm-->
    <!-- ref="confirm"-->
    <!-- :title="'Вы удаляете ' + checkboxes.length + ' элемента'"-->
    <!-- text="Вы уверены? Операцию нельзя будет отменить."-->
    <!-- @resolve="removeAllConfirm"-->
    <!-- />-->
  </teleport>
</template>

<script setup>
import CommunalListHeader from '@/components/communal/CommunalListHeader'
import CommunalFilter from '@/components/communal/CommunalFilter'
import CommunalList from '@/components/communal/CommunalList'
import CommunalForm from '@/components/communal/CommunalForm'
// import AppLoaderRowPlaceholder from '@/components/ui/AppLoaderRowPlaceholder'
import { dateF } from '@/utils/date'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const closeModal = ref(false)
const loader = ref(true)
const currentInitial = ref({
  date: dateF(new Date(), { locale: 'fr-CA' }),
  elctr: 0,
  gas: 0,
  water: 0,
  trash: 100,
  summ: 1000
})
const prevInitial = computed(() => store.getters['communal/prevData'] || {})
const items = computed(() => store.getters['communal/communal'] || [])

onMounted(async () => {
  await store.dispatch('communal/load')
  loader.value = false
})
</script>
