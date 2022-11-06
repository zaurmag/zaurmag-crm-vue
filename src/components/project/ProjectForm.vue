<template>
  <form action="#" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label class="form-label" for="addRecordDate">Дата</label>
      <input class="form-control form-control-lg" :class="{'is-invalid': dError}" id="addRecordDate" type="date" v-model="date" @blur="dBlur">
      <div class="invalid-feedback d-block fz-12" v-if="dError">{{ dError }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="addRecordTitle">Наименование</label>
      <input class="form-control form-control-lg" :class="{'is-invalid': tError}" id="addRecordTitle" type="text" v-model="title" @blur="tBlur">
      <div class="invalid-feedback d-block fz-12" v-if="tError">{{ tError }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Тип операции</label>
      <select class="form-select form-select-lg" :class="{'is-invalid': typeError}" id="addRecordType" v-model="type">
        <option value="income" selected>Приход</option>
        <option value="outcome">Расход</option>
        <option value="pending">В ожидании</option>
      </select>
      <div class="invalid-feedback d-block fz-12" v-if="typeError">{{ typeError }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="addRecordAmount">Сумма</label>
      <input class="form-control form-control-lg" :class="{'is-invalid': aError}" id="addRecordAmount" type="number" v-model="amount" @blur="aBlur">
      <div class="invalid-feedback d-block fz-12" v-if="aError">{{ aError }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label" for="addRecordDescr">Описание</label>
      <textarea class="form-control form-control-lg" :class="{'is-invalid': descError}" id="addRecordDescr" @blur="descBlur" v-model="desc"></textarea>
      <div class="invalid-feedback d-block fz-12" v-if="descError">{{ descError }}</div>
    </div>

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
    return {
      ...useProjectForm(emit, props.initial)
    }
  }
}
</script>
