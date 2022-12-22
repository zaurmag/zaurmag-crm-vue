<template>
  <header :class="['main__header', classListHeader]" v-if="$slots.header || title">
    <h1 class="h4 main__header-tlt" v-if="title">{{ title }}</h1>
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
      required: false
    },
    back: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: false
    },
    classListHeader: {
      type: String,
      required: false
    }
  },
  setup (props) {
    const title = props.title ? props.title + ' |' : ''
    document.title = `${title} Система подсчета доходов/расходов`
  }
}
</script>

<style scoped>

</style>
