<template>
  <app-loader v-if="loader" />
  <template v-else-if="project">
    <app-breadcrumb />

    <app-page :title="project.title">
      <app-card>
        <template #append>
          <div class="p-sm-30 p-20">
            <div class="row">
            <div class="col-md-6">
              <div class="text-secondary fz-16">
                <time class="d-block mb-3">Дата: <span class="fw-medium">{{ project.date }}</span></time>
                <div class="mb-3">Сумма: <span class="fw-medium">{{ $currency(project.amount) }}</span></div>
                <div class="mb-4 d-flex align-items-center">
                  <span class="me-2">Тип операции:</span>
                  <app-type :type="project.type" />
                </div>
                <div class="mb-3">
                  <h5 class="mb-2">Описание:</h5>
                  <p>{{ project.desc }}</p>
                </div>
              </div>
              <div class="d-flex">
                <button class="btn btn-primary py-2" type="button" @click="editBtn">
                  <app-icon name="pencil" classList="me-2" />
                  Редактировать
                </button>
                <button class="btn btn-danger py-2 ms-2" type="button" @click="removeBtn">
                  <app-icon name="trash" classList="me-2" />
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
import AppType from '@/components/ui/AppType'
import ProjectForm from '@/components/project/ProjectForm'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import breadcrumbs from '@/use/breadcrumb'

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
      breadcrumbs.setCurrentBreadcrumbName(project.value.title)
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
    AppType,
    ProjectForm
  }
}
</script>
