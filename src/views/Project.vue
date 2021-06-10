<template>
  <app-page :title="title">
    <div class="card shadow-sm">
      <div class="card-body p-30">
        <div class="row">
          <div class="col-md-6">
            <div class="text-secondary">
              <time class="d-block mb-3">Дата: <span class="fw-medium">21.05.2021 г.</span></time>
              <div class="mb-3">Сумма: <span class="fw-medium">2 500 руб.</span></div>
              <div class="mb-3">Тип операции:<span class="badge bg-success ms-2 opacity-75">Приход</span></div>
              <div class="mb-3">
                <h6 class="mb-2">Описание:</h6>
                <p>Описание данной задачи.</p>
              </div>
            </div>
            <div class="d-flex">
              <button class="btn btn-success px-3" type="button" data-bs-toggle="modal" data-bs-target="#addRecordForm">Редактировать</button>
              <button class="btn btn-danger px-3 ms-2" type="button" data-bs-toggle="modal" data-bs-target="#confirm">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-page>
</template>

<script>
export default {
  name: 'Project',
  setup () {
    const title = 'Страница проекта'

    return {
      title
    }
  }
}
</script>

<style scoped>

</style>
