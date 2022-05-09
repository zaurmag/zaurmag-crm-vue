<template>
  <div class="card shadow-sm card__report" :class="classList">
    <slot name="prepend" />

    <header class="card-header" v-if="$slots.header || title">
      <h5 class="card-header-title h6 mb-0" v-if="title">{{ title }}</h5>
      <slot name="header" />
    </header>

    <div class="card-body">
      <slot name="default" />
    </div>

    <footer class="card-footer" v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['title', 'classList']
}
</script>

<style scoped>

</style>
