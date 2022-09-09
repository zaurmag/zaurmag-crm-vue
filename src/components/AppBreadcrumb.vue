<template>
  <nav aria-label="breadcrumb" v-if="$route.path !== '/'">
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">Главная</router-link>
      </li>
      <li class="breadcrumb-item active">{{ current }}</li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
  props: {
    current: {
      type: String,
      required: true
    }
  }
}
</script>
