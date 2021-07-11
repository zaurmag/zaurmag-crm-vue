<template>
  <nav class="breadcrumb fz-12" v-if="$route.path !== '/'">
    <li class="breadcrumb-item">
      <router-link to="/">Главная</router-link>
    </li>
    <li class="breadcrumb-item active">{{ current }}</li>
  </nav>
</template>

<script>
export default {
  name: 'TheBreadcrumb',
  props: {
    current: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
