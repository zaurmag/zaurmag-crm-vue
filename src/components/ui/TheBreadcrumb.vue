<template>
  <nav class="breadcrumb fz-12" v-if="$route.path !== '/'">
    <li class="breadcrumb-item">
      <router-link to="/">Главная</router-link>
    </li>
    <li class="breadcrumb-item active">{{ title }}</li>
  </nav>
</template>

<script>
export default {
  name: 'TheBreadcrumb',
  setup () {
    const title = document.title

    return {
      title
    }
  }
}
</script>

<style scoped>

</style>
