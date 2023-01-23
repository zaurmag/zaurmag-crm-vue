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
          class-list-wrapper="m-0"
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

    <form-control
      id="addRecordEl"
      v-model.number="fields.electr"
      label="Электричество"
      type="number"
      class-list-input="form-control-lg"
      :error="fields.electrError"
      @blur="fields.electrBlur"
    />

    <form-control
      id="addRecordGas"
      v-model.number="fields.gas"
      label="Газ"
      type="number"
      class-list-input="form-control-lg"
      :error="fields.gasError"
      @blur="fields.gasBlur"
    />

    <form-control
      id="addRecordWater"
      v-model.number="fields.water"
      label="Вода"
      type="number"
      class-list-input="form-control-lg"
      :error="fields.waterError"
      @blur="fields.waterBlur"
    />

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
      <f-upload />
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
import FUpload from '@/components/ui/FUpload.vue'
import { useCommunalForm } from '@/use/communal-form'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useCalcCommunalData } from '@/use/calc-communal-data'
import { isHasKeysObject } from '@/utils/helpers'

// eslint-disable-next-line no-undef
const emit = defineEmits(['close', 'submit'])

// eslint-disable-next-line no-undef
const props = defineProps({
  initial: {
    type: Object,
    required: false,
    default() {
      return {}
    }
  }
})

const store = useStore()
let { ...fields } = useCommunalForm(props.initial)
fields = reactive(fields)

const prevData = computed(() => store.getters['communal/prevData'] ?? {})
const rates = computed(() => store.getters['communal/rates'] || {})

const onSubmit = fields.handleSubmit(async ({ status, date, desc }) => {
  try {
    const dateNow = new Date()
    const fullDate = `${date} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`
    const isInitial = isHasKeysObject(props.initial)

    const { ...calcData } = useCalcCommunalData(
      fields.electr,
      fields.gas,
      fields.water,
      prevData,
      rates
    )

    const payload = {
      date: fullDate,
      status,
      desc,
      ...calcData
    }

    if (isInitial) {
      await store.dispatch('communal/update', {
        id: props.initial.id,
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
