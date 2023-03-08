<template>
  <app-breadcrumb />

  <app-page-header title="Оплата коммунальных">
    <template #header>
      <div class="d-flex align-items-center">
        <app-button
          class-list-btn="btn-primary px-3"
          :attrs="{
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addCommunalRecord'
          }"
          :icon="{ name: 'pencil-square', placement: 'prepend' }"
        >
          <span class="ms-2 d-md-inline d-none">Добавить показания</span>
        </app-button>

        <app-button
          class-list-btn="btn-outline-secondary ms-10 px-3"
          :attrs="{
            'data-bs-toggle': 'modal',
            'data-bs-target': '#communalSettingForm'
          }"
          :icon="{ name: 'piggy-bank', placement: 'prepend', classList: 'fz-16' }"
        >
          <span class="ms-2 d-none d-md-inline">Тарифы</span>
        </app-button>
      </div>
    </template>

    <app-card class-list="mb-30">
      <template #header>
        <div class="row align-items-start align-items-md-center">
          <communal-list-header
            :checkboxes="checkboxes"
            @remove="showBsModal('#confirmAllSelected')"
          />

          <div
            v-if="items.length"
            class="col"
          >
            <communal-filter v-model="filter" />
          </div>
        </div>
      </template>

      <communal-list
        :items="items"
        :loader="loader"
        @selected="selectCheckboxes"
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
  </app-page-header>

  <teleport to="body">
    <app-bs-modal
      id="addCommunalRecord"
      title="Добавить показания счетчиков"
      :close="closeFormModal"
      @hide="closeFormModal = false"
    >
      <communal-form
        :prev-initial="prevInitialData"
        @close="closeFormModal = true"
        :key="prevInitialData.id"
      />
    </app-bs-modal>

    <app-bs-modal
      id="communalSettingForm"
      title="Тарифы"
      :close="closeFormModal"
      @hide="closeFormModal = false"
    >
      <communal-settings-form
        :key="rates?.id"
        :initials="rates"
        @submit="closeSettingsForm"
      />
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
import CommunalListHeader from '../components/CommunalListHeader.vue'
import CommunalFilter from '../components/CommunalFilter.vue'
import CommunalList from '../components/CommunalList.vue'
import CommunalForm from '../components/CommunalForm.vue'
import CommunalSettingsForm from '../components/CommunalSettingsForm.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { showBsModal, closeBsModal } from '@/use/bs-modal'
import { checkboxes, selectCheckboxes, resetCheckboxes } from '@/use/checkboxes'
import { dateF } from '@/utils/date'

const store = useStore()
let closeFormModal = ref(false)
const loader = ref(true)
const filter = ref({})
const rates = computed(() => store.getters['communal/rates'] || {})
const prevInitialData = computed(() => store.getters['communal/prevData'] ?? {})

const items = computed(() =>
  store.getters['communal/communal']
    .filter(req => {
      if (filter.value.dateFrom && filter.value.dateTo) {
        const reqDate = dateF(req.date, { locale: 'fr-CA' })

        return (
          new Date(filter.value.dateFrom) <= new Date(reqDate) &&
          new Date(reqDate) <= new Date(filter.value.dateTo)
        )
      }

      return req
    })
    .filter(req => {
      if (filter.value.status) {
        const status = filter.value.status === 'paid'
        return status === req.status || filter.value.status === 'all'
      }

      return req
    })
)

const removeAllConfirm = async () => {
  try {
    await store.dispatch('communal/delete', checkboxes.value)
    await store.dispatch('communal/load')
    resetCheckboxes()
    closeBsModal('#confirmAllSelected')
  } catch (e) {
    /* empty */
  }
}
// End checkboxes

const closeSettingsForm = async () => {
  await store.dispatch('communal/loadRates')
  closeFormModal.value = true
}

onMounted(async () => {
  await store.dispatch('communal/load')
  await store.dispatch('communal/loadRates')
  loader.value = false
})
</script>
