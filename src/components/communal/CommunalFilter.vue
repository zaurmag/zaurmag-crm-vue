<template>
  <div class="form form--filter row gy-3 align-items-center gy-xl-2 gx-4 mt-xl-0 mt-3">
    <div class="col-xl-auto">
      <div class="d-lg-flex align-items-center">
        <select id="filterSelectPeriod">
          <option value="month">Месяц</option>
          <option value="quarter">Квартал</option>
          <option value="year">Год</option>
        </select>
        <div class="dropdown ms-lg-2 mt-2 mt-lg-0">
          <button class="btn btn-light" type="button" data-bs-toggle="dropdown">
            <svg class="icon icon-calendar3">
              <use xlink:href="#calendar3"></use>
            </svg><span class="ms-2">Диапазон дат</span>
          </button>
          <div class="dropdown-menu p-3">
            <div class="d-flex align-items-center">
              <label class="text-secondary me-2">от:</label>
              <input class="form__control" id="filterDateFrom" type="date">
            </div>
            <div class="d-flex align-items-center">
              <label class="form__label me-2" for="filterDateTo">до:</label>
              <input class="form__control" id="filterDateTo" type="date">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-auto">
      <div class="d-flex align-items-center">
        <label class="form__label me-3">Статус:</label>
        <select id="filterSelectType">
          <option value="all">Все</option>
          <option value="income">Оплачено</option>
          <option value="outcome">Не оплачено</option>
        </select>
      </div>
    </div>
    <div class="col-xl-auto">
      <button class="btn btn-outline-secondary btn-round fz-16 p-0" type="button" data-bs-toggle="tooltip" title="Сбросить фильтр">
        <svg class="icon icon-x">
          <use xlink:href="#x"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>

</script>
