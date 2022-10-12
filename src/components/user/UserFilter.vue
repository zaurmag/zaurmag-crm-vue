<template>
  <div class="form form--filter row gy-3 gy-xl-2 gx-4 mt-xl-0 mt-3">
    <div class="col-xl-auto">
      <div class="d-lg-flex align-items-center">
        <div class="dropdown ms-lg-2 mt-2 mt-lg-0">
          <button class="btn btn-light" type="button" data-bs-toggle="dropdown">
            <app-icon name="calendar3" />
            <span class="ms-2">Дата регистрации</span>
          </button>
          <div class="dropdown-menu p-3">
            <div class="d-flex align-items-center">
              <label class="text-secondary me-2">от:</label>
              <input class="form__control" id="filterDateFrom" type="date">
            </div>
            <div class="d-flex align-items-center">
              <label class="form__label me-2" for="filterDateTo">до:</label>
              <input class="form__control" id="filterDateTo" type="date">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-auto">
      <div class="d-flex align-items-center">
        <label class="form__label me-3">Статус:</label>
        <app-select
          :options="statusOptions"
          v-model="status"
        />
      </div>
    </div>
    <div class="col-xl-auto">
      <div class="d-flex align-items-center">
        <div class="form__group form__group--icon w-100">
          <app-icon name="search" />
          <input class="form__control" type="search" placeholder="Поиск по имени">
        </div>
        <button class="btn btn-outline-secondary btn-round fz-16 ms-3 p-0" type="button" data-bs-toggle="tooltip" title="Сбросить фильтр">
          <app-icon name="x" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSelect from '@/components/ui/AppSelect'
import { USER_STATUS } from '@/constans'
import { ref } from 'vue'

const statusOptions = ref(USER_STATUS)
const status = ref(statusOptions.value[0])
</script>
