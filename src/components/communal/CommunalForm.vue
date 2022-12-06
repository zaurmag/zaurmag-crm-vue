<template>
  <form action="#" @submit.prevent="onSubmit">
    <div class="row mb-3 justify-content-between align-items-center">
      <div class="col-lg-4 col-sm-6 order-2 order-sm-1">
        <form-control
          id="date"
          type="date"
          classListWrapper="m-0"
          classListInput="form-control-lg"
          v-model="date"
          :error="dError"
          @blur="dBlur"
        />
      </div>
      <div class="col-sm-auto order-1 order-sm-2 mb-3 mb-sm-0">
        <form-checkbox
          id="status"
          :label="status ? 'Оплачено' : 'Не оплачено'"
          v-model="status"
        />
      </div>
    </div>

    <p class="h4 col m-3">Предыдущие:</p>
    <div class="row g-15 mb-30">
      <form-control
        id="addRecordElPrev"
        label="Электричество"
        type="number"
        classListWrapper="col-sm"
        classListInput="form-control-lg"
        v-model="prevElctr"
        disabled
      />

      <form-control
        id="addRecordGasPrev"
        label="Газ"
        type="number"
        classListWrapper="col-sm"
        classListInput="form-control-lg"
        v-model.number="prevGas"
        disabled
      />

      <form-control
        id="addRecordWaterPrev"
        label="Вода"
        type="number"
        classListWrapper="col-sm"
        classListInput="form-control-lg"
        v-model.number="prevWater"
        disabled
      />
    </div>

    <p class="h4 mb-3">Новые:</p>
    <div class="row g-15 mb-30">
      <form-control
        id="addRecordEl"
        label="Электричество"
        type="number"
        classListWrapper="col-sm"
        classListInput="form-control-lg"
        v-model.number="elctr"
        :error="elctrError"
        @blur="elctrBlur"
      />

      <form-control
        id="addRecordGas"
        label="Газ"
        type="number"
        classListWrapper="col-sm"
        classListInput="form-control-lg"
        v-model.number="gas"
        :error="gasError"
        @blur="gasBlur"
      />

      <form-control
        id="addRecordWater"
        label="Вода"
        type="number"
        classListWrapper="col-sm"
        classListInput="form-control-lg"
        v-model.number="water"
        :error="waterError"
        @blur="waterBlur"
      />
    </div>

    <p class="h4 mb-3">Разница:</p>
    <div class="row mb-30">
      <div class="col-sm">
        <span class="fz-18">{{ prevElctr - elctr }}</span>
        <hr class="my-2">
      </div>
      <div class="col-sm">
        <span class="fz-18">{{ prevGas - gas }}</span>
        <hr class="my-2">
      </div>
      <div class="col-sm">
        <span class="fz-18">{{ prevWater - water }}</span>
        <hr class="my-2">
      </div>
    </div>

    <div class="row g-15 mb-3">
      <div class="col-sm">
        <p class="form-label">Прикрепить фото квитанции</p>
        <div class="f-upload">
          <div class="f-upload__area">
            <app-icon name="image" classList="f-upload__image" />
            <h5 class="h6 f-upload__title">Перетащите файл сюда</h5>
            <p class="f-upload__desc">или</p>
            <span class="btn btn-primary btn-sm px-3">Загрузите</span>
          </div>
        </div>
      </div>

      <form-control
        id="addRecordDesc"
        label="Описание"
        type="textarea"
        :error="descError"
        @blur="descBlur"
        v-model="desc"
        classListWrapper="col-sm d-flex flex-column"
        classListInput="form-control-lg h-100"
      />
    </div>

    <div class="text-center">
      <app-button
        classListWrapper="text-center"
        classListBtn="btn-primary w-100 px-4"
        type="submit"
        :animate="{ loading: isSubmitting }"
      >
        Отправить
      </app-button>
    </div>
  </form>
</template>

<script setup>
import { useCommunalForm } from '@/use/communal-form'
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['close', 'submit'])
// eslint-disable-next-line no-undef
const props = defineProps({
  initial: {
    type: Object,
    required: false
  }
})

const {
  status,
  date,
  dError,
  dBlur,
  elctr,
  elctrError,
  elctrBlur,
  gas,
  gasError,
  gasBlur,
  water,
  waterError,
  waterBlur,
  desc,
  descError,
  descBlur,
  isSubmitting,
  onSubmit
} = useCommunalForm(emit, props.initial)
const prevElctr = ref(100)
const prevGas = ref(50)
const prevWater = ref(40)
elctr.value = 0
gas.value = 0
water.value = 0
</script>
