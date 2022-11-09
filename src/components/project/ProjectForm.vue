<template>
  <form action="#" @submit.prevent="onSubmit">
    <form-control
      id="addRecordDate"
      label="Дата"
      type="date"
      :error="dError"
      @blur="dBlur"
      v-model="date"
      classListInput="form-control-lg"
    />

    <form-control
      id="addRecordTitle"
      label="Наименование"
      :error="tError"
      @blur="tBlur"
      v-model="title"
      classListInput="form-control-lg"
    />

    <div class="mb-3">
      <label class="form-label">Тип операции</label>
      <form-select
        v-model="type"
        :options="typeOptions"
        :error="typeError"
        classList="select--lg select--bordered"
      />
    </div>

    <form-control
      id="addRecordAmount"
      label="Сумма"
      type="number"
      :error="aError"
      :blur="aBlur"
      v-model="amount"
      classListInput="form-control-lg"
    />

    <form-control
      id="addRecordDesc"
      label="Описание"
      type="textarea"
      :error="descError"
      :blur="descBlur"
      v-model="desc"
      classListInput="form-control-lg"
    />

    <app-button
      classListWrapper="w-100"
      classListBtn="btn-primary btn-lg px-3 w-100"
      type="submit"
      :animate="{ loading: isSubmitting }"
    >
      {{ initial ? 'Сохранить' : 'Отправить'}}
    </app-button>
  </form>
</template>

<script>
import { useProjectForm } from '@/use/project-form'
import { ref } from 'vue'
import { TYPE_OPTIONS } from '@/constans'

export default {
  name: 'ProjectForm',
  emits: ['close', 'submit'],
  props: {
    initial: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  setup (props, { emit }) {
    const typeOptions = ref(TYPE_OPTIONS.slice(1))

    return {
      typeOptions,
      ...useProjectForm(emit, props.initial)
    }
  }
}
</script>
