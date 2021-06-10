<template>
  <div class="table-responsive">
    <table class="table text-center align-middle table-borderless table-nowrap">
      <thead class="table-light">
        <tr>
          <th>
            <input class="form-check-input float-none" type="checkbox" value="">
          </th>
          <th>#</th>
          <th>Наименование</th>
          <th>Дата</th>
          <th class="no-wrap">Описание</th>
          <th>Тип операции</th>
          <th>Сумма</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td>
          <input class="form-check-input float-none" type="checkbox" value="">
        </td>
        <td>1</td>
        <td><a class="fw-medium link-dark text-decoration-none" href="/page.html">Гасан lakia3d.ru</a></td>
        <td>02.06.20221</td>
        <td class="no-wrap" style="min-width: 380px">Продление сайта lakia3d.ru Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, tempore.</td>
        <td>
          <div class="badge bg-success">Приход</div>
        </td>
        <td>3300</td>
          <td>
            <button class="btn btn-outline-primary btn-sm py-1 fz-12" type="button">Открыть</button>
            <button class="btn btn-sm text-danger ms-2 fz-16" type="button" title="Удалить">
              <svg class="icon icon-trash">
                <use xlink:href="#trash"></use>
              </svg>
            </button>
          </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ProjectList'
}
</script>

<style scoped>

</style>
