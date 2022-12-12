<template>
  <form action="#" @submit.prevent="onSubmit">
    <div class="row mb-30 justify-content-between align-items-center">
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
          :classListLabel="status ? 'text-primary' : 'text-secondary'"
          v-model="status"
        />
      </div>
    </div>

    <p class="h4 col mb-3">Предыдущие:</p>
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
        <span class="fz-18">{{ elctr === 0 ? elctr : elctr - prevElctr }}</span>
        <hr class="my-2">
      </div>
      <div class="col-sm">
        <span class="fz-18">{{ gas === 0 ? gas : gas - prevGas }}</span>
        <hr class="my-2">
      </div>
      <div class="col-sm">
        <span class="fz-18">{{ water === 0 ? water : water - prevWater }}</span>
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

<script>
import { useCommunalForm } from '@/use/communal-form'
import { computed } from 'vue'

export default {
  name: 'CommunalForm',
  emits: ['close', 'submit'],
  props: {
    currentInitial: {
      type: Object,
      required: false
    },
    prevInitial: {
      type: Object,
      required: false
    }
  },
  setup (props, { emit }) {
    const prevElctr = computed(() => props.prevInitial.elctr || 0)
    const prevGas = computed(() => props.prevInitial.gas || 0)
    const prevWater = computed(() => props.prevInitial.water || 0)
    // console.log(props.currentInitial)

    return {
      prevElctr,
      prevGas,
      prevWater,
      ...useCommunalForm(props.currentInitial, emit)
    }
  }
}
</script>
