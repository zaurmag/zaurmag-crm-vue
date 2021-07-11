<template>
  <app-loader v-if="loader" />
  <template v-else-if="project">
    <the-breadcrumb />
    <app-page :title="project.title">
      <div class="card shadow-sm">
        <div class="card-body p-30">
          <div class="row">
            <div class="col-md-6">
              <div class="text-secondary">
                <time class="d-block mb-3">Дата: <span class="fw-medium">{{ $dateF(project.date) }}</span></time>
                <div class="mb-3">Сумма: <span class="fw-medium">{{ $currency(project.amount) }}</span></div>
                <div class="mb-3 d-flex align-items-center"><span class="me-2">Тип операции:</span><app-type :type="project.type" /></div>
                <div class="mb-3">
                  <h6 class="mb-2">Описание:</h6>
                  <p>{{ project.desc }}</p>
                </div>
              </div>
              <div class="d-flex">
                <button class="btn btn-success px-3" type="button" @click="editBtn">Редактировать</button>
                <button class="btn btn-danger px-3 ms-2" type="button" @click="removeBtn">Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-page>
  </template>

  <teleport to="body">
    <app-modal ref="modal" title="Редактировать запись">
      <project-form @close="closeModal" />
    </app-modal>

    <app-confirm
      v-if="project"
      ref="confirm"
      :title="'Вы удаляете проект ' + project.title"
      text="Вы уверены? Операцию нельзя будет отменить."
      @resolve="removeConfirm"
    />
  </teleport>
</template>

<script>
import AppType from '@/components/ui/AppType'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppModal from '@/components/ui/AppModal'
import AppConfirm from '@/components/ui/AppConfirm'
import TheBreadcrumb from '@/components/ui/TheBreadcrumb'
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

    onMounted(async () => {
      project.value = await store.dispatch('project/loadOne', route.params.id)
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

    const editBtn = () => {
      modal.value.modal = true
    }

    return {
      project,
      loader,
      modal,
      confirm,
      removeBtn,
      removeConfirm,
      editBtn
    }
  },
  components: {
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
