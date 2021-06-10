<template>
  <header class="header sticky-top">
    <div class="header__left d-flex align-items-center">
      <a class="header__sb-collapse header__sb-collapse--js" href="#" data-bs-toggle="tooltip" data-bs-placement="right" title="Свернуть">
        <svg class="icon icon-arrow-bar-left">
          <use xlink:href="#arrow-bar-left"></use>
        </svg>
        <svg class="icon icon-arrow-bar-right">
          <use xlink:href="#arrow-bar-right"></use>
        </svg>
      </a>
      <div class="text-secondary small ms-lg-40 ms-15">7 июня 2021 г. 11:05</div>
    </div>
    <div class="heeader__right">
      <div class="header__user-dropdown dropdown">
        <a class="dropdown-toggle" href="#" data-bs-toggle="dropdown">
          <img class="header__user-drp-img img-fluid me-2" src="/images/zaurmag.png" alt="Заур">
          Заур
        </a>
        <ul class="dropdown-menu shadow">
          <li><a class="dropdown-item" href="#">Мой профиль</a></li>
          <li><a class="dropdown-item" href="#">Выход</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped>

</style>
