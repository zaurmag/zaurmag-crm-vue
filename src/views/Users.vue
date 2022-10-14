<template>
  <app-breadcrumb current="Пользователи" />

  <app-page title="Пользователи">
    <template #header>
      <button
        class="main__add-btn btn btn-primary shadow-sm-soft"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addUser"
      >
        <app-icon name="person-plus" classList="fz-18 me-sm-2" />
        <span class="d-sm-inline d-none">Добавить</span>
      </button>
    </template>

    <app-card>
      <template #header>
        <div class="row align-items-center">
          <div class="col-xxl mb-0 mb-xl-2 mb-xxl-0 d-flex align-items-center justify-content-between">
            <button class="btn btn-light fz-18 p-2 d-xl-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#filter" aria-expanded="false">
              <app-icon name="sliders" />
            </button>
          </div>
          <div class="col-xxl-auto collapse d-xl-block" id="filter">
            <user-filter />
          </div>
        </div>
      </template>

      <template #append>
        <user-list
          :users="paginateItems"
          @selected="selectChbx"
        />
      </template>

      <template #footer>
        <app-pagination
          :count="users.length"
          :pages="PAGE_SIZE"
          v-model="page"
          @changeSize="changePageSize"
        />
      </template>
    </app-card>
  </app-page>

  <teleport to="body">
    <app-bs-modal id="addUser" title="Добавить пользователя">
      <register-form @complete="closeModal('#addUser')" />
    </app-bs-modal>

    <app-confirm
      ref="confirm"
      :title="'Вы удаляете ' + checkboxes.length + ' элемента'"
      text="Вы уверены? Операцию нельзя будет отменить."
      @resolve="removeAllConfirm"
    />
  </teleport>
</template>

<script setup>
import UserFilter from '@/components/user/UserFilter'
import UserList from '@/components/user/UserList'
import RegisterForm from '@/components/RegisterForm'
import { useProductPaginate } from '@/use/product-paginate'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { closeModal } from '@/use/bs-modal'

const users = computed(() => store.getters['users/users'])

const store = useStore()
const checkboxes = ref([])
const PAGE_SIZE = ref({ name: 10, value: 10 })

const selectChbx = checkboxIds => {
  checkboxes.value = checkboxIds
}

// const removeAll = () => {
//   confirm.value.confirm = true
// }

const removeAllConfirm = async () => {
  try {
    // await store.dispatch('project/delete', checkboxes.value)
    // await store.dispatch('project/load')
    confirm.value.confirm = false
    checkboxes.value = []
  } catch (e) {}
}
const { page, paginateItems, changePageSize } = useProductPaginate(users, PAGE_SIZE)

onMounted(async () => {
  await store.dispatch('users/load')
})
</script>
