<template>
	<div class="form-control-wrapper">
		<label v-if="label" :class="['form-label', classListLabel]" :for="id">{{
			label
		}}</label>

		<slot name="prepend" />

		<div v-if="type === 'password'" class="form-control-password">
			<input
				:id="id"
				v-model="model"
				:class="['form-control', { 'is-invalid': error }, classListInput]"
				:type="type"
				:placeholder="placeholder"
				@blur="$emit('blur')"
				@input="$emit('input', $event)"
			/>
			<app-button
				class-list-btn="form-control-toggle"
				:icon="{ name: password.icon, placement: 'prepend' }"
				@click="togglePasswordHandler"
			/>
		</div>

		<textarea
			v-else-if="type === 'textarea'"
			:id="id"
			v-model="model"
			:class="['form-control', { 'is-invalid': error }, classListInput]"
			@blur="$emit('blur')"
			@input="$emit('input', $event)"
		></textarea>

		<input
			v-else
			:id="id"
			v-model="model"
			:class="['form-control', { 'is-invalid': error }, classListInput]"
			:type="type"
			:placeholder="placeholder"
			:disabled="disabled"
			@blur="$emit('blur')"
			@input="$emit('input', $event)"
		/>
		<div v-if="error" class="invalid-feedback d-block fz-12">{{ error }}</div>

		<slot name="append" />
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

// eslint-disable-next-line no-undef
const emits = defineEmits('blur', 'input')
// eslint-disable-next-line no-undef
const props = defineProps({
	label: {
		type: String,
		default: '',
	},
	id: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'text',
	},
	modelValue: {
		type: String,
		default: '',
	},
	error: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	classListInput: {
		type: String,
		default: '',
	},
	classListLabel: {
		type: String,
		default: '',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
})

const model = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emits('update:modelValue', value)
	},
})

// Password toggle
const togglePassRef = ref(false)
const password = ref({
	type: props.type,
	icon: 'eye',
})

const togglePasswordHandler = () => {
	togglePassRef.value = !togglePassRef.value

	if (togglePassRef.value) {
		password.value.type = 'text'
		password.value.icon = 'eye-slash'
	} else {
		password.value.type = 'password'
		password.value.icon = 'eye'
	}
}
</script>
