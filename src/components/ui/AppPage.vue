<template>
  <header class="main__header">
    <h1 class="h4 main__header-tlt">{{ title }}</h1>
    <slot name="header" />
  </header>
  <slot name="default" />
</template>

<script>
export default {
  name: 'AppPage',
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    document.title = `${props.title} | Система подсчета доходв/расходов`
  }
}
</script>

<style scoped>

</style>
