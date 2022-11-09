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

<!--    <div class="mb-3">-->
<!--      <label class="form-label">Тип операции</label>-->
<!--      <app-select-->
<!--        v-model="type"-->
<!--        :options="typeOptions"-->
<!--        classList="select&#45;&#45;lg select&#45;&#45;bordered"-->
<!--      />-->
<!--    </div>-->

    <div class="mb-3">
      <label class="form-label">Тип операции</label>
      <select class="form-select form-select-lg" :class="{'is-invalid': typeError}" id="addRecordType" v-model="type">
        <option value="income" selected>Приход</option>
        <option value="outcome">Расход</option>
        <option value="pending">В ожидании</option>
      </select>
      <div class="invalid-feedback d-block fz-12" v-if="typeError">{{ typeError }}</div>
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
    const typeOptions = ref(TYPE_OPTIONS)

    return {
      typeOptions,
      ...useProjectForm(emit, props.initial)
    }
  }
}
</script>
