<template>
  <div
    class="card shadow-sm-soft"
    :class="classList"
  >
    <slot name="prepend" />

    <header
      v-if="$slots.header || title"
      class="card-header"
    >
      <h5
        v-if="title"
        class="card-header-title h6 mb-0"
      >
        {{ title }}
      </h5>
      <slot name="header" />
    </header>

    <div
      v-if="$slots.default"
      class="card-body"
      :class="classListBody"
    >
      <slot name="default" />
    </div>

    <slot name="append" />

    <footer
      v-if="$slots.footer"
      class="card-footer"
    >
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
    },
    classListBody: {
      type: String,
      required: false
    }
  }
}
</script>
