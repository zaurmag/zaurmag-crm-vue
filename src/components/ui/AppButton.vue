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
      <app-icon
        v-if="icon?.placement === 'prepend'"
        :name="icon?.name"
        :class-list="icon.classList"
      />
      <slot name="default" />
      <app-icon
        v-if="icon?.placement === 'append'"
        :name="icon?.name"
        :class-list="icon.classList"
      />
    </button>
  </span>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    id: {
      type: String,
      required: false
    },
    classListBtn: {
      type: String,
      required: false
    },
    classListWrapper: {
      type: String,
      required: false
    },
    animate: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    icon: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    attrs: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    },
    attrsWrapper: {
      type: Object,
      required: false,
      default() {
        return {}
      }
    }
  },
  emits: ['click']
}
</script>

<style scoped lang="sass">
.btn-wrapper
	display: inline-block
</style>
