<template>
  <div :class="['select', { 'is-open': isOpen, 'is-invalid': error }, classList]">
    <div
      ref="selectText"
      :class="[
        'select__text',
        'btn',
        'btn-light',
        { 'text-secondary': text === 'Выберите...' },
        classListBtn
      ]"
      @click="toggle"
    >
      {{ text }}
    </div>

    <div class="select__dropdown">
      <ul class="select__list shadow-sm">
        <li
          v-for="option in options"
          :key="option.name"
          :class="['select__item', { 'is-selected': text === option.name }]"
          :data-value="option.value"
          :title="option.name"
          @click="select(option)"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
  <div
    v-if="error"
    class="invalid-feedback d-block fz-12"
  >
    {{ error }}
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

export default {
  name: 'FormSelect',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Выберите...'
    },
    error: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    classList: {
      type: String,
      default: ''
    },
    classListBtn: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectText = ref()
    const getName = value => props.options.find(option => option?.value === value)?.name
    const modelVal = computed(() => props.modelValue)
    const text = ref(getName(props.modelValue) || props.placeholder)
    const isOpen = ref(false)

    watch(modelVal, value => {
      text.value = getName(value) || props.placeholder
    })

    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const close = () => {
      isOpen.value = false
    }

    const select = option => {
      text.value = option.name
      emit('update:modelValue', option.value)
      close()
    }

    const clickHandler = event => {
      if (event.target !== selectText.value) {
        close()
      }
    }

    onMounted(() => {
      document.addEventListener('click', clickHandler, true)
    })

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler, true)
    })

    return {
      selectText,
      text,
      isOpen,
      toggle,
      select
    }
  }
}
</script>

<style scoped lang="sass">
.select
	$self: &

	position: relative
	font-size: 14px

	&__text
		align-items: center
		display: flex
		color: $gray-800
		cursor: pointer
		justify-content: space-between
		height: 100%

		&::after
			border-top: 1px solid #000
			border-right: 1px solid #000
			content: ""
			transform: rotate(135deg)
			transition: transform .2s ease
			margin-left: 10px
			display: block
			height: 6px
			width: 6px

	&__dropdown
		display: none
		position: absolute
		top: calc(100% + 7px)
		left: 0
		right: 0
		z-index: 10
		min-width: 120px

	&.is-open
		#{$self}
			&__dropdown
				display: block

			&__text
				&::after
					transition: transform .2s ease
					transform: rotate(-45deg)

	&.is-invalid
		border-color: $danger

	&__list
		background-color: #fff
		border: 1px solid $gray-300
		border-radius: 5px
		margin: 0
		padding: 0
		list-style: none
		font-size: 14px
		overflow: hidden
		white-space: nowrap

		li
			padding: 8px 15px
			cursor: pointer
			overflow: hidden
			text-overflow: ellipsis

			&:hover
				background-color: $gray-100

			&.is-selected
				background-color: $gray-200

	// Bordered
	&--bordered
		border: 1px solid $gray-400
		border-radius: $border-radius
		height: auto

		#{$self}
			&__text
				padding: 13px 20px
				background-color: transparent !important

			&__dropdown
				top: 50px

	// Styled
	&--styled
		padding-left: 15px
		padding-right: 15px
		border-radius: $border-radius
		height: 35px

		&:hover,
		&.is-open
			background-color: $blue-100
			transition: background-color .2s ease
</style>
