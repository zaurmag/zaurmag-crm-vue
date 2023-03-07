<template>
  <form
    action="#"
    @submit.prevent="onSubmit"
  >
    <form-control
      id="addRecordDate"
      v-model="date"
      label="Дата"
      type="date"
      :error="dError"
      class-list-input="form-control-lg"
      @blur="dBlur"
    />

    <form-control
      id="addRecordTitle"
      v-model="title"
      label="Наименование"
      :error="tError"
      class-list-input="form-control-lg"
      @blur="tBlur"
    />

    <div class="mb-3">
      <label class="form-label">Тип операции</label>
      <form-select
        v-model="type"
        :options="typeOptions"
        :error="typeError"
        class-list="select--lg select--bordered"
      />
    </div>

    <form-control
      id="addRecordAmount"
      v-model="amount"
      label="Сумма"
      type="number"
      :error="aError"
      :blur="aBlur"
      class-list-input="form-control-lg"
    />

    <form-control
      id="addRecordDesc"
      v-model="desc"
      label="Описание"
      type="textarea"
      :error="descError"
      :blur="descBlur"
      class-list-input="form-control-lg"
    />

    <app-button
      class-list-wrapper="w-100"
      class-list-btn="btn-primary btn-lg px-3 w-100"
      type="submit"
      :animate="{ loading: isSubmitting }"
    >
      {{ initial ? 'Сохранить' : 'Отправить' }}
    </app-button>
  </form>
</template>

<script>
import { useProjectForm } from '../composition/form'
import { TYPE_OPTIONS } from '@/constans'
import { ref } from 'vue'

export default {
  name: 'ProjectForm',
  props: {
    initial: {
      type: Object,
      required: false
    }
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const typeOptions = ref(TYPE_OPTIONS.slice(1))

    return {
      typeOptions,
      ...useProjectForm(emit, props.initial)
    }
  }
}
</script>
