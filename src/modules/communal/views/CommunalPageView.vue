<template>
  <app-breadcrumb />
  <div
    v-if="!communal"
    class="position-relative d-flex align-items-center"
    style="height: 400px"
  >
    <app-loader />
  </div>

  <app-page-header
    v-else
    class-list="d-block"
  >
    <template #header>
      <div class="row align-items-center g-20">
        <div class="col-sm d-flex align-items-center">
          <h1 class="h3 main__header-tlt">
            {{ $dateF(communal.date, { month: 'long' }) + ' г.' }}
          </h1>
          <div class="ms-3 d-none d-sm-block text-nowrap">
            <app-indicator
              :class-list="`me-2 indicator--lg ${communal.status ? 'bg-success' : 'bg-warning'}`"
            />
            <span class="fz-16">{{ communal.status ? 'Оплачено' : 'Не оплачено' }}</span>
          </div>
        </div>

        <div class="col-sm-auto d-flex align-items-center justify-content-between">
          <div class="me-3 d-sm-none">
            <app-indicator :class-list="`me-2 ${communal.status ? 'bg-success' : 'bg-warning'}`" />
            <span class="fz-16">{{ communal.status ? 'Оплачено' : 'Не оплачено' }}</span>
          </div>
          <div class="d-flex align-items-center">
            <app-button
              class-list-btn="btn-primary px-3"
              :attrs="{
                'data-bs-toggle': 'modal',
                'data-bs-target': '#editRecordForm'
              }"
              :icon="{
                name: 'pencil-square',
                placement: 'prepend'
              }"
            >
              <span class="d-none d-md-inline ms-2">Редактировать</span>
            </app-button>

            <app-button
              class-list-btn="btn-outline-danger px-3 ms-10"
              :icon="{
                name: 'trash',
                placement: 'prepend'
              }"
              @click="remove"
            >
              <span class="d-none d-md-inline ms-2">Удалить</span>
            </app-button>
          </div>
        </div>
      </div>
    </template>

    <app-card class-list-body="pt-sm-25">
      <h2 class="h4 mb-xxl-30 mb-20">Сумма: {{ $currency(communal.amount) }}</h2>

      <div class="row g-15 mb-30 justify-content-center">
        <communal-full-page-card
          title="Электричество, квт/ч"
          :amount="communal.electr.amount"
          :rate="communal.electr.rate"
          :diff="communal.electr.diff"
          :current="communal.electr.current"
          :prev="communal.electr.prev"
          color="green"
        />

        <communal-full-page-card
          title="Газ, м<sup>3</sup>"
          :amount="communal.gas.amount"
          :rate="communal.gas.rate"
          :diff="communal.gas.diff"
          :current="communal.gas.current"
          :prev="communal.gas.prev"
          color="yellow"
        />

        <communal-full-page-card
          title="Вода, м<sup>3</sup>"
          :amount="communal.water.amount"
          :rate="communal.water.rate"
          :diff="communal.water.diff"
          :current="communal.water.current"
          :prev="communal.water.prev"
          color="blue"
        />

        <communal-full-page-card
          title="Мусор"
          :amount="communal.trash.amount"
          :rate="communal.trash.rate"
          :people="communal.trash.people"
          color="gray"
        />

        <communal-full-page-card
          title="Обсл. газ. оборуд."
          :amount="communal.maintanceGe"
          color="green"
        />
      </div>
      <div class="row">
        <div
          v-if="communal.desc"
          class="col-sm"
        >
          <p><strong>Описание</strong></p>
          <p class="mw-md-50">{{ communal.desc }}</p>
        </div>
        <div
          v-if="communal?.image"
          class="col-sm-6"
        >
          <p><strong>Фото квитанции</strong></p>
          <button
            class="btn btn-empty p-0"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#openModalImage"
          >
            <img
              class="img-fluid"
              :src="communal?.image"
              :alt="communal?.date"
            />
          </button>
        </div>
      </div>
    </app-card>
  </app-page-header>

  <teleport to="body">
    <app-bs-modal
      id="openModalImage"
      class="modal--empty modal-lg"
    >
      <img
        class="img-fluid"
        :src="communal?.image"
        :alt="communal?.date"
      />
    </app-bs-modal>

    <app-bs-modal
      id="editRecordForm"
      title="Редактировать показания счетчиков"
      :close="modal"
      @hide="modal = false"
    >
      <communal-form
        v-if="communal"
        :curr-initial="communal"
        @close="closeModal"
        @change-image-url="loadCommunal"
      />
    </app-bs-modal>

    <app-confirm
      v-if="communal"
      id="removeConfirm"
      :title="'Дата от ' + $dateF(communal.date, { month: 'long' }) + ' г.'"
      text="Уверены? Операцию нельзя будет отменить."
      @resolve="removeConfirm"
    />
  </teleport>
</template>

<script setup>
import CommunalForm from '../components/CommunalForm.vue'
import CommunalFullPageCard from '../components/CommunalFullPageCard.vue'
import breadcrumbs from '@/use/breadcrumb'
import { dateF } from '@/utils/date'
import { showBsModal, closeBsModal } from '@/use/bs-modal'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useStore()
const communal = ref(null)
let modal = ref(false)
const id = route.params.id

const remove = () => {
  showBsModal('#removeConfirm')
}

const removeConfirm = async () => {
  closeBsModal('#removeConfirm')
  await store.dispatch('communal/delete', id)
  await router.push({ name: 'Communal' })
}

const loadCommunal = async val => {
  if (!val) {
    communal.value = await store.dispatch('communal/loadOne', id)
  }
}

const closeModal = async () => {
  await loadCommunal()
  modal.value = true
}

onMounted(async () => {
  await store.dispatch('communal/loadRates')
  await loadCommunal()
  const title = dateF(communal.value.date) + ' г.'
  breadcrumbs.setCurrentBreadcrumbName(title)
})

breadcrumbs.setCurrentBreadcrumbName('')
</script>
