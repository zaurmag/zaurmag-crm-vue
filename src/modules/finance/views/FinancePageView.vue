<template>
  <app-loader v-if="!project" />
  <template v-else>
    <app-breadcrumb />

    <app-page-header :title="project?.title">
      <app-card>
        <template #append>
          <div class="p-sm-30 p-20">
            <div class="row">
              <div class="col-md-6">
                <div class="text-secondary fz-16">
                  <time class="d-block mb-3"
                    >Дата: <span class="fw-medium">{{ project?.date }}</span></time
                  >
                  <div class="mb-3">
                    Сумма:
                    <span class="fw-medium">{{ $currency(project?.amount) }}</span>
                  </div>
                  <div class="mb-4 d-flex align-items-center">
                    <span class="me-2">Тип операции:</span>
                    <app-type :type="project.type" />
                  </div>
                  <div class="mb-3">
                    <h5 class="mb-2">Описание:</h5>
                    <p>{{ project?.desc }}</p>
                  </div>
                </div>
                <div class="d-flex">
                  <app-button
                    class-list-btn="btn-primary py-2"
                    :attrs="{
                      'data-bs-toggle': 'modal',
                      'data-bs-target': '#editProject'
                    }"
                    :icon="{
                      name: 'pencil',
                      placement: 'prepend',
                      classList: 'me-2'
                    }"
                  >
                    Редактировать
                  </app-button>

                  <app-button
                    class-list-btn="btn-danger py-2 ms-2"
                    :icon="{
                      name: 'trash',
                      placement: 'prepend',
                      classList: 'me-2'
                    }"
                    @click="removeBtn"
                  >
                    Удалить
                  </app-button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </app-card>
    </app-page-header>
  </template>

  <teleport
    v-if="project"
    to="body"
  >
    <app-bs-modal
      id="editProject"
      title="Редактировать запись"
      :close="closeModal"
      @hide="closeModal = false"
    >
      <project-form
        :initial="initial"
        @close="closeModalProject"
      />
    </app-bs-modal>

    <app-confirm
      :id="REMOVE_CONFIRM"
      :title="'Вы удаляете проект ' + project?.title"
      text="Вы уверены? Операцию нельзя будет отменить."
      @resolve="removeConfirm"
    />
  </teleport>
</template>

<script setup>
import AppType from '@/components/ui/AppType.vue'
import ProjectForm from '../components/FinanceForm.vue'
import breadcrumbs from '@/use/breadcrumb'
import { showBsModal, closeBsModal } from '@/use/bs-modal'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const REMOVE_CONFIRM = 'removeConfirm'
const route = useRoute()
const router = useRouter()
const store = useStore()
const project = ref()
const closeModal = ref(false)
const initial = ref()
const id = route.params.id

onMounted(async () => {
  try {
    project.value = await store.dispatch('project/loadOne', id)
    initial.value = { ...project.value }
    breadcrumbs.setCurrentBreadcrumbName(project.value.title)
  } catch (e) {
    throw new Error(e)
  }
})

const removeBtn = () => {
  showBsModal(`#${REMOVE_CONFIRM}`)
}

const removeConfirm = async () => {
  try {
    await store.dispatch('project/delete', id)
    closeBsModal(`#${REMOVE_CONFIRM}`)
    await router.push({ name: 'Finance' })
  } catch (e) {
    throw new Error(e)
  }
}

const closeModalProject = async () => {
  project.value = await store.dispatch('project/loadOne', id)
  closeModal.value = true
}
</script>
