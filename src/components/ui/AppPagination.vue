<template>
  <nav class="pagination">
    <div class="row align-items-center gy-3">
      <div class="col-sm">
        <div class="pagination__pagesize">
          <div class="text-secondary me-2">Показать:</div>
          <select id="pageSize">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
          <div class="text-secondary ms-3">из</div>
          <div class="text-secondary ms-2">20</div>
        </div>
      </div>
      <div class="col-sm-auto">
        <ul class="pagination__list">
          <li class="pagination__item is-disabled"><a class="pagination__link" href="#">Предыдущий</a></li>
          <li class="pagination__item is-active"><a class="pagination__link" href="#">1</a></li>
          <li class="pagination__item"><a class="pagination__link" href="#">2</a></li>
          <li class="pagination__item"><a class="pagination__link" href="#">3</a></li>
          <li class="pagination__item"><a class="pagination__link" href="#">4</a></li>
          <li class="pagination__item"><a class="pagination__link" href="#">5</a></li>
          <li class="pagination__item"><a class="pagination__link" href="#">Следующий</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppPagination'
}
</script>

<style scoped>

</style>
