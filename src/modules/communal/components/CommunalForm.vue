<template>
  <form
    action="#"
    @submit.prevent="onSubmit"
  >
    <div class="row mb-30 align-items-center">
      <div class="col-sm mb-3 mb-sm-0">
        <form-control
          id="date"
          v-model="fields.date"
          type="date"
          class="m-0"
          :error="fields.dError"
          @blur="fields.dBlur"
        />
      </div>
      <div class="col-sm d-flex justify-content-sm-end">
        <form-switch
          id="status"
          v-model="fields.status"
          :label="fields.status ? 'Оплачено' : 'Не оплачено'"
          :class-list-label="fields.status ? 'text-primary' : 'text-secondary'"
        />
      </div>
    </div>

    <p class="form-label fw-medium">
      Предыдущие:
      <app-button
        id="editPrevData"
        class-list-btn="btn-light ms-10 p-1"
        :icon="{ name: 'pencil', placement: 'prepend' }"
        @click="prevIsDisabled = !prevIsDisabled"
      />
    </p>

    <div class="row g-10 mb-15">
      <form-control
        id="prevEl"
        v-model.number="fields.prevElectr"
        label="Электричество"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :disabled="prevIsDisabled"
        :error="fields.prevElectrError"
        @blur="fields.prevElectrBlur"
      />

      <form-control
        id="prevGas"
        v-model.number="fields.prevGas"
        label="Газ"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :disabled="prevIsDisabled"
        :error="fields.prevGasError"
        @blur="fields.prevGasBlur"
      />

      <form-control
        id="prevWater"
        v-model.number="fields.prevWater"
        label="Вода"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :disabled="prevIsDisabled"
        :error="fields.prevWaterError"
        @blur="fields.prevWaterBlur"
      />
    </div>

    <p class="form-label fw-medium">Текущие:</p>
    <div class="row g-10">
      <form-control
        id="addRecordEl"
        v-model.number="fields.electr"
        label="Электричество"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :error="fields.electrError"
        @blur="fields.electrBlur"
      />

      <form-control
        id="addRecordGas"
        v-model.number="fields.gas"
        label="Газ"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :error="fields.gasError"
        @blur="fields.gasBlur"
      />

      <form-control
        id="addRecordWater"
        v-model.number="fields.water"
        label="Вода"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :error="fields.waterError"
        @blur="fields.waterBlur"
      />
    </div>

    <form-control
      id="addRecordDesc"
      v-model="fields.desc"
      label="Описание"
      type="textarea"
      :error="fields.descError"
      class-list-input="form-control-lg h-100"
      @blur="fields.descBlur"
    />

    <div class="mb-3">
      <p class="form-label">Прикрепить фото квитанции</p>
      <f-upload
        :id="currInitial.id"
        v-model="imageDownloadUrl"
        :url="imageUploadUrl"
      />
    </div>

    <div class="text-center mt-30">
      <app-button
        class-list-btn="btn-primary w-100 px-4"
        type="submit"
        :animate="{ loading: fields.isSubmitting }"
      >
        Отправить
      </app-button>
    </div>
  </form>
</template>

<script setup>
import { useCommunalForm } from '../composition/communal-form'
import { useCalcCommunalData } from '../composition/calc-communal-data'
import { isHasKeysObject } from '@/utils/common'
import { useStore } from 'vuex'
import { ref, reactive, computed, defineAsyncComponent, watch } from 'vue'

const FUpload = defineAsyncComponent(() => import('@/components/ui/FUpload.vue'))

// eslint-disable-next-line no-undef
const emit = defineEmits(['close', 'submit', 'change-image-url'])

// eslint-disable-next-line no-undef
const props = defineProps({
  currInitial: {
    type: Object,
    default() {
      return {}
    }
  },
  prevInitial: {
    type: Object,
    default() {
      return {}
    }
  }
})

const store = useStore()
let { ...fields } = useCommunalForm(props.currInitial, props.prevInitial)
fields = reactive(fields)

const prevIsDisabled = ref(true)
const rates = computed(() => store.getters['communal/rates'] || {})
const userId = computed(() => store.getters['users/userID'])
const imageUploadUrl = `/uploads/${userId.value}/images/`
const imageDownloadUrl = ref(props.currInitial?.image || '')

watch(imageDownloadUrl, url => {
  emit('change-image-url', url)
})

const onSubmit = fields.handleSubmit(async ({ status, date, desc }) => {
  try {
    const dateNow = new Date()
    const fullDate = `${date} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`
    const isInitial = isHasKeysObject(props.currInitial)
    const currValues = { electr: fields.electr, gas: fields.gas, water: fields.water }
    const prevValues = {
      electr: fields.prevElectr,
      gas: fields.prevGas,
      water: fields.prevWater
    }

    const { ...calcData } = useCalcCommunalData(currValues, prevValues, rates)

    const payload = {
      date: fullDate,
      status,
      desc,
      image: imageDownloadUrl.value,
      ...calcData
    }

    if (isInitial) {
      await store.dispatch('communal/update', {
        id: props.currInitial?.id,
        ...payload
      })
      emit('close')

      return
    }

    await store.dispatch('communal/add', {
      id: Date.now().toString(),
      ...payload
    })

    emit('close')
    fields.resetForm()
    await store.dispatch('communal/load')
  } catch (e) {
    /* empty */
  }
})
</script>
