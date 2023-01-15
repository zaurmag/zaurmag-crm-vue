<template>
	<div class="w-editor">
		<div class="w-editor__container">
			<quill-editor
				v-model:content="desc"
				theme="snow"
				toolbar="minimal"
				content-type="html"
				:placeholder="placeholder"
			/>
		</div>
	</div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import { ref, watch } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])

// eslint-disable-next-line no-undef
const props = defineProps({
	modelValue: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		default: 'Описание...',
	},
})

const desc = ref(props.modelValue)

watch(desc, (val) => {
	emit('update:modelValue', val)
})
</script>

<style scoped lang="sass">
.w-editor
	height: 150px

	&__container
		border-radius: 0 0 $border-radius $border-radius
		height: calc(100% - 42px)

		&.ql-container
			&.ql-snow
				border-color: $gray-300
				height: calc(100% - 42px)

	.ql-toolbar
		border-radius: $border-radius $border-radius 0 0

		&.ql-snow
			border-color: $gray-300
</style>
