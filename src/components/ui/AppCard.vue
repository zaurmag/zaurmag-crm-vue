<template>
  <div class="card shadow-sm card__report">
    <header class="card-header" v-if="title">
      <h5 class="card-header-title h6 mb-0">{{ title }}</h5>
      <slot name="title" />
    </header>

    <div class="card-body">
      <slot name="default" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['title']
}
</script>

<style scoped>

</style>
