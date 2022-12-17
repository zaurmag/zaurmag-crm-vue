<template>
  <div class="form form--filter row g-3 align-items-center mt-xl-0 mt-3">
    <div class="col-xl-auto">
      <div class="d-lg-flex align-items-center">
        <app-select
          :options="periodOptions"
          v-model="periodSelect"
        />
      </div>
    </div>

    <div class="col-xl-auto">
      <div class="dropdown">
        <app-button
          classListBtn="btn-light"
          :attrsWrapper="{ 'data-bs-toggle': 'dropdown' }"
          :icon="{ name: 'calendar3', placement: 'prepend' }"
        >
          <span class="ms-2">Диапазон дат</span>
        </app-button>

        <div class="dropdown-menu p-3">
          <form-control
            classListWrapper="d-flex align-items-center mb-2"
            classListLabel="text-secondary me-2 mb-0"
            classListInput="form-control-sm"
            label="от:"
            type="date"
            id="filterDateFrom"
          />

          <form-control
            classListWrapper="d-flex align-items-center"
            classListLabel="text-secondary me-2 mb-0"
            classListInput="form-control-sm"
            label="до:"
            type="date"
            id="filterDateTo"
          />
        </div>
      </div>
    </div>

    <div class="col-xl-auto">
      <app-select
        :options="statusOptions"
        v-model="statusSelect"
      />
    </div>

    <div class="col-xl-auto">
      <app-button
        classListBtn="btn-outline-secondary btn-round fz-16 p-0"
        :attrs="{ 'data-bs-toggle': 'tooltip', title: 'Сбросить фильтр' }"
        :icon="{ name: 'x', placement: 'prepend' }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PERIOD_OPTIONS, STATUS_OPTIONS } from '@/constans'

const periodOptions = ref(PERIOD_OPTIONS.slice(3))
const periodSelect = ref({ name: 'Выбрать период' })
const statusOptions = ref(STATUS_OPTIONS)
const statusSelect = ref({ name: 'Выбрать статус' })
</script>
