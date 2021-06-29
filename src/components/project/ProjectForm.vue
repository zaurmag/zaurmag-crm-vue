<template>
  <form action="#">
    <div class="mb-3">
      <label class="form-label" for="addRecordDate">Дата</label>
      <input class="form-control form-control-lg" id="addRecordDate" type="date">
    </div>
    <div class="mb-3">
      <label class="form-label" for="addRecordTitle">Наименование</label>
      <input class="form-control form-control-lg" id="addRecordTitle" type="text">
    </div>
    <div class="mb-3">
      <label class="form-label">Тип операции</label>
      <select id="addRecordType" ref="addRecordType">
        <option value="income">Приход</option>
        <option value="outcome">Расход</option>
        <option value="pending">В ожидании</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label" for="addRecordAmount">Сумма</label>
      <input class="form-control form-control-lg" id="addRecordAmount" type="text">
    </div>
    <div class="mb-3">
      <label class="form-label" for="addRecordDescr">Описание</label>
      <textarea class="form-control form-control-lg" id="addRecordDescr"></textarea>
    </div>
    <button class="btn btn-primary btn-lg px-3 w-100" type="submit">Отправить</button>
  </form>
</template>

<script>
import { Select } from '@/vendor/select'
import { onMounted, ref } from 'vue'

export default {
  name: 'ProjectForm',
  setup () {
    const addRecordType = ref(null)

    onMounted(() => {
      return new Select(addRecordType.value, {
        selectedID: 1,
        classes: ['select--bordered']
      })
    })

    return {
      addRecordType
    }
  }
}
</script>

<style scoped>

</style>
