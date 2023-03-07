<template>
  <app-page-header title="Dashboard">
    <div class="row">
      <div class="col">
        <router-link
          class="btn btn-primary d-flex btn-lg"
          :to="{ name: 'Finance' }"
        >
          Финансы
        </router-link>
      </div>
      <div class="col">
        <router-link
          class="btn btn-success d-flex btn-lg"
          :to="{ name: 'Communal' }"
        >
          Коммунальные
        </router-link>
      </div>
    </div>
  </app-page-header>
</template>
