<template>
  <app-breadcrumb current="Пользователи" />

  <app-page title="Пользователи">
    <template #header>
      <button class="main__add-btn btn btn-primary shadow-sm-soft" type="button" @click="openModal">
        <svg class="icon icon-person-plus fz-18 me-sm-2">
          <use xlink:href="#person-plus"></use>
        </svg>
        <span class="d-sm-inline d-none">Добавить</span>
      </button>
    </template>

    <app-card>
      <template #header>
        <div class="row align-items-center">
          <div class="col-xxl mb-0 mb-xl-2 mb-xxl-0 d-flex align-items-center justify-content-between">
            <button class="btn btn-light fz-18 p-2 d-xl-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#filter" aria-expanded="false">
              <svg class="icon icon-filter">
                <use xlink:href="#filter"></use>
              </svg>
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
    <app-modal ref="modal" title="Добавить пользователя">
      <register-form @complete="closeModal" />
    </app-modal>

    <app-confirm
      ref="confirm"
      :title="'Вы удаляете ' + checkboxes.length + ' элемента'"
      text="Вы уверены? Операцию нельзя будет отменить."
      @resolve="removeAllConfirm"
    />
  </teleport>
</template>

<script setup>
import AppBreadcrumb from '@/components/AppBreadcrumb'
import AppPage from '@/components/ui/AppPage'
import AppCard from '@/components/ui/AppCard'
import AppModal from '@/components/ui/AppModal'
import AppConfirm from '@/components/ui/AppConfirm'
import UserFilter from '@/components/user/UserFilter'
import UserList from '@/components/user/UserList'
import RegisterForm from '@/components/RegisterForm'
import AppPagination from '@/components/ui/AppPagination'
import { useProductPaginate } from '@/use/product-paginate'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

const users = computed(() => store.getters['users/users'])

const store = useStore()
const modal = ref(false)
const checkboxes = ref([])
const PAGE_SIZE = ref({ name: 10, value: 10 })
const openModal = () => {
  modal.value.modal = true
}
const closeModal = () => {
  modal.value.modal = false
}

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

// Mock users
// const users = ref([
//   {
//     id: 1,
//     name: 'Заур',
//     imgUrl: '/images/zaurmag.png',
//     email: 'zaurmag@gmail.com',
//     phone: '+79064495544',
//     city: 'Каспийск',
//     desc: 'Текст описания...',
//     dateRegister: '2022-05-10',
//     role: 'admin',
//     status: 1
//   },
//   {
//     id: 2,
//     name: 'Хаджи-Мустафа',
//     imgUrl: '/images/zaurmag.png',
//     email: 'hadj-m@gmail.com',
//     phone: '+9069999999',
//     city: 'Ново-Габцах',
//     desc: 'Текст описания...',
//     dateRegister: '2022-07-15',
//     role: 'user',
//     status: 1
//   },
//   {
//     id: 3,
//     name: 'Кистаман',
//     imgUrl: '/images/zaurmag.png',
//     email: 'kisya@gmail.com',
//     phone: '+9039999999',
//     city: 'Дербент',
//     desc: 'Текст описания...',
//     dateRegister: '2022-08-20',
//     role: 'user',
//     status: 0
//   },
//   {
//     id: 4,
//     name: 'Фатима',
//     imgUrl: '/images/zaurmag.png',
//     email: 'fatimamag8422@gmail.com',
//     phone: '+9064828422',
//     city: 'Каспийск',
//     desc: 'Текст описания...',
//     dateRegister: '2022-05-20',
//     role: 'user',
//     status: 1
//   }
// ])
const { page, paginateItems, changePageSize } = useProductPaginate(users, PAGE_SIZE)

onMounted(async () => {
  await store.dispatch('users/load')
})
</script>
