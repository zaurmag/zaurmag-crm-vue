<template>
  <div class="form form--filter row gy-3 gy-xl-2 gx-4 mt-xl-0 mt-3">
    <div class="col-xl-auto">
      <div class="d-lg-flex align-items-center">
        <div class="dropdown ms-lg-2 mt-2 mt-lg-0">
          <app-button
            classListBtn="btn-light"
            :attrsWrapper="{ 'data-bs-toggle': 'dropdown' }"
            :icon="{ name: 'calendar3', placement: 'prepend' }"
          >
            <span class="ms-2">Дата регистрации</span>
          </app-button>
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

        <app-button
          classListWrapper="ms-3"
          classListBtn="btn-outline-secondary btn-round fz-16 p-0"
          v-tooltip="{ title: 'Сбросить фильтр' }"
          :icon="{ name: 'x', placement: 'prepend' }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSelect from '@/components/ui/AppSelect.vue'
import { USER_STATUS } from '@/constans'
import { ref } from 'vue'

const statusOptions = ref(USER_STATUS)
const status = ref(statusOptions.value[0])
</script>
