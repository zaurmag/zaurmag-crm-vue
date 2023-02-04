<template>
  <app-breadcrumb current="Пользователи" />

  <app-page-header title="Пользователи">
    <template #header>
      <app-button
        class-list-btn="main__add-btn btn btn-primary shadow-sm-soft"
        :attrs="{ 'data-bs-toggle': 'modal', 'data-bs-target': '#addUser' }"
        :icon="{
          name: 'person-plus',
          placement: 'prepend',
          classList: 'fz-18 me-sm-2'
        }"
      >
        <span class="d-sm-inline d-none">Добавить пользователя</span>
      </app-button>
    </template>

    <app-card>
      <template #header>
        <div class="row align-items-center">
          <div
            class="col-xxl mb-0 mb-xl-2 mb-xxl-0 d-flex align-items-center justify-content-between"
          >
            <app-button
              class-list-btn="btn-light fz-18 p-2 d-xl-none ms-auto"
              :attrs="{
                'data-bs-toggle': 'collapse',
                'data-bs-target': '#filter',
                'aria-expanded': 'false'
              }"
              :icon="{ name: 'filter', placement: 'prepend' }"
            />
          </div>
          <div
            id="filter"
            class="col-xxl-auto collapse d-xl-block"
          />
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
          v-model="page"
          :count="users.length"
          :pages="PAGE_SIZE"
          @change-size="changePageSize"
        />
      </template>
    </app-card>
  </app-page-header>

  <teleport to="body">
    <app-bs-modal
      id="addUser"
      title="Добавить пользователя"
    >
      <register-form @complete="closeBsModal('#addUser')" />
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
import UserList from '@/components/user/UserList.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { useProductPaginate } from '@/use/product-paginate'
import { closeBsModal } from '@/use/bs-modal'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

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
  } catch (e) {
    /* empty */
  }
}

const { page, paginateItems, changePageSize } = useProductPaginate(users, PAGE_SIZE)

onMounted(async () => {
  await store.dispatch('users/load')
})
</script>
