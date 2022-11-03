<template>
  <div v-if="users && users.length" class="table-responsive">
    <table class="table align-middle table-borderless card-table mb-0">
      <thead class="table-light">
      <tr>
        <th class="table-cell-check">
          <div class="form-check">
            <input class="form-check-input float-none" type="checkbox" v-model="allCheckbox">
          </div>
        </th>
        <th>#</th>
        <th>ФИО</th>
        <th>E-mail</th>
        <th>Дата регистрации</th>
        <th class="no-wrap">Статус</th>
        <th class="no-wrap">Роль</th>
        <th style="width: 40px">Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, idx) in users" :key="user.id">
        <td>
          <div class="form-check">
            <input
              class="form-check-input float-none"
              type="checkbox"
              v-model="checkbox"
              :value="user.id"
            >
          </div>
        </td>
        <td>{{ idx + 1 }}</td>
        <td style="min-width: 215px">
          <div class="d-flex align-items-center">
            <img class="img-thumbnail rounded-circle me-3" :src="user.imgUrl || '/images/user.png'" width="40" alt="" />
            <router-link
              class="table-cell-title-link is-transition"
              :to="{name: 'Profile', params: {id: user.id}}"
            >{{ user.name }}</router-link>
          </div>
        </td>
        <td>{{ user.email }}</td>
        <td>{{ $dateF(user.dateRegister) }}</td>
        <td>
          <app-indicator :classList="user.status ? 'bg-success me-2' : 'bg-secondary me-2'" />
          {{ user.status ? 'Активен' : 'Не активен' }}
        </td>
        <td>
          <span :class="['badge', user.role === 'admin' ? 'bg-danger' : 'bg-secondary']">{{ user.role }}</span>
        </td>
        <td style="min-width: 140px">
          <router-link
            class="btn btn-outline-secondary btn-sm fz-12 px-2 py-1"
            :to="{name: 'EditProfile', params: {id: user.id}}"
          >
            <app-icon name="pencil" classList="me-2" />
            <span class="d-none d-sm-inline">Редактировать</span>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="card-body">
    <p class="m-0 text-secondary text-center">Нет пользователей для отображения.</p>
  </div>
</template>

<script setup>
import { defineProps, computed, defineEmits, ref } from 'vue'

const emit = defineEmits(['selected'])
const props = defineProps({
  users: {
    type: Array,
    required: true,
    default () {
      return []
    }
  }
})

const checkbox = ref([])
const allCheckbox = computed({
  get () {
    emit('selected', checkbox.value)
    return checkbox.value.length === props.users.length && props.users.length !== 0
  },
  set (val) {
    checkbox.value = val ? props.users.map(n => n.id) : []
  }
})
</script>

<style scoped lang="sass">
  .img-thumbnail
    width: 40px
    height: 40px
</style>
