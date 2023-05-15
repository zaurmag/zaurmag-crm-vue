<template>
  <span
    :class="['btn-wrapper', { 'progress h-100': Object.keys(animate).length }, classListWrapper]"
    v-bind="attrsWrapper"
  >
    <button
      :id="id"
      :class="[
        'btn',
        {
          'progress-bar progress-bar-striped progress-bar-animated': animate.loading
        },
        classListBtn
      ]"
      :type="type"
      v-bind="attrs"
      @click="$emit('click')"
    >
      <svg-icon
        v-if="icon?.placement === 'prepend'"
        :name="icon?.name"
        :class="icon.classList"
      />
      <slot name="default" />
      <svg-icon
        v-if="icon?.placement === 'append'"
        :name="icon?.name"
        :class="icon.classList"
      />
    </button>
  </span>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineEmits(['click'])

// eslint-disable-next-line no-undef
defineProps({
  id: {
    type: String,
    default: null
  },
  classListBtn: {
    type: String,
    default: ''
  },
  classListWrapper: {
    type: String,
    default: ''
  },
  animate: {
    type: Object,
    default() {
      return {}
    }
  },
  icon: {
    type: Object,
    default() {
      return {}
    }
  },
  type: {
    type: String,
    default: 'button'
  },
  attrs: {
    type: Object,
    default() {
      return {}
    }
  },
  attrsWrapper: {
    type: Object,
    default() {
      return {}
    }
  }
})
</script>

<style scoped lang="sass">
.btn-wrapper
	display: inline-block
</style>
