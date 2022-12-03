<template>
  <div class="d-flex align-items-center">
    <p class="text-secondary m-0">Отмечено: 5</p>
    <button class="btn btn-outline-danger btn-sm ms-3" type="button">
      <svg class="icon icon-trash">
        <use xlink:href="#trash"></use>
      </svg><span class="ms-1 d-none d-lg-inline">Удалить</span>
    </button>
  </div>
  <button class="btn btn-light fz-18 p-2 d-xl-none" type="button" data-bs-toggle="collapse" data-bs-target="#filter" aria-expanded="false">
    <svg class="icon icon-filter">
      <use xlink:href="#filter"></use>
    </svg>
  </button>
</template>

<script setup>

</script>
