<template>
  <app-loader v-if="loader" />
  <template v-else-if="project">
    <the-breadcrumb :current="project.title" />

    <app-page :title="project.title">
      <app-card>
        <template #append>
          <div class="p-sm-30 p-20">
            <div class="row">
            <div class="col-md-6">
              <div class="text-secondary fz-16">
                <time class="d-block mb-3">Дата: <span class="fw-medium">{{ project.date }}</span></time>
                <div class="mb-3">Сумма: <span class="fw-medium">{{ $currency(project.amount) }}</span></div>
                <div class="mb-4 d-flex align-items-center"><span class="me-2">Тип операции:</span><app-type :type="project.type" /></div>
                <div class="mb-3">
                  <h5 class="mb-2">Описание:</h5>
                  <p>{{ project.desc }}</p>
                </div>
              </div>
              <div class="d-flex">
                <button class="btn btn-primary py-2" type="button" @click="editBtn">
                  <svg class="icon me-2">
                    <use xlink:href="#pencil"></use>
                  </svg>
                  Редактировать
                </button>
                <button class="btn btn-danger py-2 ms-2" type="button" @click="removeBtn">
                  <svg class="icon me-2">
                    <use xlink:href="#trash"></use>
                  </svg>
                  Удалить
                </button>
              </div>
            </div>
          </div>
          </div>
        </template>
      </app-card>
    </app-page>
  </template>

  <teleport to="body" v-if="project">
    <app-modal ref="modal" title="Редактировать запись">
      <project-form
        :initial="initial"
        @submit="updateProject"
        @close="modal.modal = false"
      />
    </app-modal>

    <app-confirm
      ref="confirm"
      :title="'Вы удаляете проект ' + project.title"
      text="Вы уверены? Операцию нельзя будет отменить."
      @resolve="removeConfirm"
    />
  </teleport>
</template>

<script>
import AppCard from '@/components/ui/AppCard'
import AppType from '@/components/ui/AppType'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppModal from '@/components/ui/AppModal'
import AppConfirm from '@/components/ui/AppConfirm'
import TheBreadcrumb from '@/components/AppBreadcrumb'
import ProjectForm from '@/components/project/ProjectForm'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Project',
  setup () {
    const loader = ref(true)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const project = ref()
    const modal = ref(false)
    const confirm = ref(false)
    const initial = ref()

    onMounted(async () => {
      project.value = await store.dispatch('project/loadOne', route.params.id)
      initial.value = { ...project.value }
      loader.value = false
    })

    const removeBtn = () => {
      confirm.value.confirm = true
    }

    const removeConfirm = async () => {
      try {
        await store.dispatch('project/delete', route.params.id)
        confirm.value.confirm = false
        router.push('/')
      } catch (e) {}
    }

    const editBtn = async () => {
      modal.value.modal = true
    }

    const updateProject = val => {
      project.value = val
    }

    return {
      project,
      initial,
      loader,
      modal,
      confirm,
      removeBtn,
      removeConfirm,
      editBtn,
      updateProject
    }
  },
  components: {
    AppCard,
    AppPage,
    AppType,
    TheBreadcrumb,
    AppModal,
    AppLoader,
    ProjectForm,
    AppConfirm
  }
}
</script>

<style scoped>

</style>
