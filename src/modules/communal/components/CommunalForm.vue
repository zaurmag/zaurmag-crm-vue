<template>
  <form
    action="#"
    @submit.prevent="onSubmit"
  >
    <div class="row mb-30 align-items-center">
      <div class="col-sm mb-3 mb-sm-0">
        <form-control
          id="date"
          v-model="date"
          type="date"
          class="m-0"
          :error="dError"
          @blur="dBlur"
        />
      </div>
      <div class="col-sm d-flex justify-content-sm-end">
        <form-switch
          id="status"
          v-model="status"
          :label="status ? 'Оплачено' : 'Не оплачено'"
          :class-list-label="status ? 'text-primary' : 'text-secondary'"
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
        v-model.number="prevElectr"
        label="Электричество"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :disabled="prevIsDisabled"
        :error="prevElectrError"
        @blur="prevElectrBlur"
      />

      <form-control
        id="prevGas"
        v-model.number="prevGas"
        label="Газ"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :disabled="prevIsDisabled"
        :error="prevGasError"
        @blur="prevGasBlur"
      />

      <form-control
        id="prevWater"
        v-model.number="prevWater"
        label="Вода"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :disabled="prevIsDisabled"
        :error="prevWaterError"
        @blur="prevWaterBlur"
      />
    </div>

    <p class="form-label fw-medium">Текущие:</p>
    <div class="row g-10">
      <form-control
        id="addRecordEl"
        v-model.number="electr"
        label="Электричество"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :error="electrError"
        @blur="electrBlur"
      />

      <form-control
        id="addRecordGas"
        v-model.number="gas"
        label="Газ"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :error="gasError"
        @blur="gasBlur"
      />

      <form-control
        id="addRecordWater"
        v-model.number="water"
        label="Вода"
        type="number"
        class="col-sm"
        class-list-input="form-control-lg"
        :error="waterError"
        @blur="waterBlur"
      />
    </div>

    <form-control
      id="addRecordDesc"
      v-model="desc"
      label="Описание"
      type="textarea"
      :error="descError"
      class-list-input="form-control-lg h-100"
      @blur="descBlur"
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
        :animate="{ loading: isSubmitting }"
      >
        Отправить
      </app-button>
    </div>
  </form>
</template>

<script lang="ts">
import { useCommunalForm } from '../composition/communal-form'
import { useStore } from 'vuex'
import { ref, computed, defineComponent } from 'vue'

export default defineComponent({
  components: {
    FUpload: () => import('@/components/ui/FUpload.vue')
  },
  props: {
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
  },
  emits: ['close', 'submit', 'change-image-url'],
  setup(props, { emit }) {
    const store = useStore()

    const prevIsDisabled = ref(true)
    const userId = computed(() => store.getters['users/userID'])
    const imageUploadUrl: string = `/uploads/${userId.value}/images/`

    const imageDownloadUrl = computed({
      get() {
        return props.currInitial?.image || ''
      },
      set(url) {
        emit('change-image-url', url)
      }
    })

    return {
      prevIsDisabled,
      imageUploadUrl,
      imageDownloadUrl,
      ...useCommunalForm(props.currInitial, props.prevInitial, emit, imageDownloadUrl)
    }
  }
})
</script>
