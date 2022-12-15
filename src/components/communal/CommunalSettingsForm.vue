<template>
  <form action="#" @submit.prevent="onSubmit">
    <form-control
      id="zhkhEl"
      type="text"
      label="Электричество, 1 кв/ч, руб."
      classListInput="form-control-lg"
      v-model.number="electr"
      :error="eError"
      @blur="eBlur"
    />
    <form-control
      id="zhkhGas"
      type="text"
      label="Газ, 1 куб/м, руб."
      classListInput="form-control-lg"
      v-model.number="gas"
      :error="gError"
      @blur="gBlur"
    />
    <form-control
      id="zhkhWater"
      type="text"
      label="Вода с канализацией, 1 куб/м, руб."
      classListInput="form-control-lg"
      v-model.number="water"
      :error="wError"
      @blur="wBlur"
    />

    <div class="mb-3 row">
      <p class="form-label">Мусор</p>
      <form-control
        id="zhkhTrashTarif"
        type="text"
        label="1 чел., руб."
        classListInput="form-control-lg"
        classListWrapper="col"
        v-model.number="trash"
        :error="tError"
        @blur="tBlur"
      />
      <form-control
        id="zhkhTrashPropisano"
        type="text"
        label="Прописано, чел."
        classListInput="form-control-lg"
        classListWrapper="col"
        v-model.number="people"
        :error="pError"
        @blur="pBlur"
      />
    </div>
    <form-control
      id="zhkhGasObsl"
      type="text"
      label="Обслуживание газ. оборудования, руб."
      classListInput="form-control-lg"
      v-model.number="maintanceGe"
      :error="mgeError"
      @blur="mgeBlur"
    />

    <app-button
      classListWrapper="w-100"
      classListBtn="btn-primary w-100 px-3"
      type="submit"
      :animate="{ loading: isSubmitting }"
    >
      Сохранить
    </app-button>
  </form>
</template>

<script>
import { useCommunalSettingsForm } from '@/use/communal-settings-form'

export default {
  name: 'CommunalSettingsForm',
  emits: ['close'],
  props: {
    initials: {
      type: Object,
      required: false
    }
  },
  setup (props, { emit }) {
    return {
      ...useCommunalSettingsForm(props.initials, emit)
    }
  }
}
</script>
