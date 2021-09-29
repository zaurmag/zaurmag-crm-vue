<template>
  <div class="col-xl-6 offset-xl-6">
    <div class="card shadow-sm card__report">
      <header class="card-header">
        <h5 class="card-header-title h6 mb-0">Отчеты</h5>
      </header>
      <div class="card-body">
        <h2 class="h3">{{ $currency(25000) }}</h2>
        <div class="progress rounded-pill mb-2 opacity-75 fz-10" style="height: 10px">
          <div class="progress-bar bg-success" style="width: 25%" data-bs-toggle="tooltip" title="Приход" data-placement="top">25%</div>
          <div class="progress-bar bg-danger" style="width: 20%" data-bs-toggle="tooltip" title="Расход" data-placement="top">20%</div>
          <div class="progress-bar bg-warning" style="width: 10%" data-bs-toggle="tooltip" title="В ожидании" data-placement="top">10%</div>
        </div>
        <div class="table-responsive mt-30">
          <table class="table table-nowrap card-table">
            <tbody>
            <tr>
              <th scope="row"><span class="indikator bg-success me-2"></span>Приход</th>
              <td>15 000 руб.</td>
              <td>
                <div class="badge bg-info opacity-75">+ 12%</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="indikator bg-danger me-2"></span>Расход</th>
              <td>15 000 руб.</td>
              <td>
                <div class="badge bg-info opacity-75">- 5%</div>
              </td>
            </tr>
            <tr>
              <th scope="row"><span class="indikator bg-warning me-2"></span>В ожидании</th>
              <td>7 000 руб.</td>
              <td>
                <div class="badge bg-warning opacity-75">- 5%</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectReport'
}
</script>

<style scoped>

</style>
