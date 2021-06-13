<template>
  <div class="form form--filter row align-items-end gy-2">
    <div class="col-xl-auto">
      <div class="row align-items-center g-3 g-lg-0">
        <div class="col-sm-2 col-md-auto">
          <label class="form__label me-3" for="filterDateFrom">Период:</label>
        </div>
        <div class="col-sm-5 col-md-auto d-flex align-items-center">
          <label class="text-secondary me-2">от:</label>
          <input class="form__control" id="filterDateFrom" type="date">
        </div>
        <div class="col-sm-5 col-md-auto d-flex align-items-center">
          <label class="form__label me-2" for="filterDateTo">до:</label>
          <input class="form__control" id="filterDateTo" type="date">
        </div>
      </div>
    </div>
    <div class="col-xl-auto">
      <div class="d-flex align-items-center">
        <label class="form__label me-3">Тип операции:</label>
        <select class="select--js" ref="filterSelectType">
          <option value="all">Все</option>
          <option value="income">Приход</option>
          <option value="outcome">Расход</option>
        </select>
      </div>
    </div>
    <div class="col-xl">
      <div class="d-flex align-items-center">
        <div class="form__group form__group--icon">
          <svg class="icon icon-search">
            <use xlink:href="#search"></use>
          </svg>
          <input class="form__control" type="search" placeholder="Поиск по наименованию">
        </div>
        <button class="btn btn-sm ms-2 text-success" type="button" title="Сбросить">
          <svg class="icon icon-x-circle">
            <use xlink:href="#x-circle"></use>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Select } from '@/vendor/select'

export default {
  name: 'ProjectFilter',
  setup () {
    const filterSelectType = ref(null)

    onMounted(() => {
      return new Select(filterSelectType.value, {
        selectedID: 1
      })
    })

    return {
      filterSelectType
    }
  }
}
</script>

<style scoped>

</style>
