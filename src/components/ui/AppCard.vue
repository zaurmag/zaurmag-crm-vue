<template>
  <div class="card shadow-sm-soft" :class="classList">
    <slot name="prepend" />

    <header class="card-header" v-if="$slots.header || title">
      <h5 class="card-header-title h6 mb-0" v-if="title">{{ title }}</h5>
      <slot name="header" />
    </header>

    <div class="card-body" v-if="$slots.default">
      <slot name="default" />
    </div>

    <slot name="append" />

    <footer class="card-footer" v-if="$slots.footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    title: {
      type: String,
      required: false
    },
    classList: {
      type: String,
      required: false
    }
  }
}
</script>
