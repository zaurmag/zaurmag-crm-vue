<template>
	<div class="d-flex align-items-center">
		<h5 class="h6 mb-0 card-header-title">Список платежей</h5>

		<template v-if="checkboxes.length">
			<p class="text-secondary ms-3 m-0">Отмечено: {{ checkboxes.length }}</p>
			<app-button
				class-list-btn="btn-outline-danger btn-sm ms-3"
				:attrs="{
					'data-bs-toggle': 'modal',
					'data-bs-target': '#addCommunalForm',
				}"
				:icon="{ name: 'trash', placement: 'prepend' }"
				@click="$emit('remove')"
			>
				<span class="ms-1 d-none d-lg-inline">Удалить</span>
			</app-button>
		</template>
	</div>

	<app-button
		class="btn-light fz-18 p-2 d-xl-none"
		:attrs="{
			'data-bs-toggle': 'collapse',
			'data-bs-target': '#filter',
			'aria-expanded': false,
		}"
		:icon="{ name: 'filter', placement: 'prepend' }"
	/>
</template>

<script setup>
// eslint-disable-next-line no-undef
defineEmits(['remove'])

// eslint-disable-next-line no-undef
defineProps({
	checkboxes: {
		type: Array,
		required: true,
		default() {
			return []
		},
	},
})
</script>
