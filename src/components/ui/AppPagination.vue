<template>
	<nav v-if="items > 1" class="pagination">
		<div class="row align-items-center gy-3 justify-content-between">
			<div class="col-sm-3">
				<div class="pagination__pagesize align-items-center">
					<div class="text-secondary me-2">Показать:</div>
					<AppSelect v-model="selectSize" :options="optionsSize" />
					<div class="text-secondary ms-3">из</div>
					<div class="text-secondary ms-2">{{ count }}</div>
				</div>
			</div>
			<div class="col-sm-auto">
				<ul class="pagination__list">
					<li
						class="pagination__item"
						:class="{ 'is-disabled': modelValue === 1 }"
					>
						<a
							class="pagination__link"
							href="#"
							@click.prevent="$emit('update:modelValue', modelValue - 1)"
							>Предыдущая</a
						>
					</li>
					<template v-for="p in items" :key="p">
						<li
							v-if="p <= 10"
							class="pagination__item"
							:class="[{ 'is-active': p === modelValue }]"
						>
							<a
								href="#"
								class="pagination__link"
								@click.prevent="$emit('update:modelValue', p)"
								>{{ p }}</a
							>
						</li>
					</template>
					<li v-if="items > 10">
						<a
							class="pagination__link"
							href="#"
							@click.prevent="$emit('update:modelValue', modelValue + 1)"
							>...</a
						>
					</li>
					<li
						class="pagination__item"
						:class="{ 'is-disabled': modelValue === items }"
					>
						<a
							class="pagination__link"
							href="#"
							@click.prevent="$emit('update:modelValue', modelValue + 1)"
							>Следующая</a
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import AppSelect from '@/components/ui/AppSelect.vue'
import { computed, ref, watch } from 'vue'

export default {
	name: 'AppPagination',
	components: {
		AppSelect,
	},
	props: ['count', 'pages', 'modelValue'],
	emits: ['changeSize', 'update:modelValue'],
	setup(props, { emit }) {
		const optionsSize = ref([
			{
				name: '10',
				value: '10',
			},
			{
				name: '20',
				value: '20',
			},
			{
				name: '50',
				value: '50',
			},
			{
				name: '100',
				value: '100',
			},
		])
		const selectSize = ref(props.pages)

		watch(selectSize, (size) => {
			emit('changeSize', size.value)
		})

		return {
			items: computed(() => Math.ceil(props.count / selectSize.value.value)),
			selectSize,
			optionsSize,
		}
	},
}
</script>

<style scoped lang="sass">
.pagination
	$self: &

	// Page size select
	&__pagesize
		display: flex
		align-items: center
		justify-content: center
		@include media-breakpoint-up(md)
			justify-content: flex-start

		.select
			height: auto

	// Items list
	&__list
		align-items: center
		display: flex
		font-size: 14px
		line-height: 1
		margin: 0
		padding: 0
		justify-content: center
		flex-wrap: wrap
		@include media-breakpoint-up(md)
			justify-content: flex-start

	&__item
		&:not(:last-child)
			margin-right: 10px

		// Disabled
		&.is-disabled
			display: none

			#{$self}
				&__link
					color: $gray-400
					pointer-events: none

		// Active
		&.is-active
			#{$self}
				&__link
					background-color: $primary
					border-radius: $border-radius
					color: $white

	&__link
		color: $secondary
		display: block
		padding: 10px 12px
		text-decoration: none
</style>
