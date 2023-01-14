<template>
	<app-breadcrumb />

	<app-page title="Оплата коммунальных">
		<template #header>
			<div class="d-flex align-items-center">
				<app-button
					class-list-btn="main__add-btn btn-primary shadow-sm-soft"
					:attrs="{
						'data-bs-toggle': 'modal',
						'data-bs-target': '#addCommunalRecord',
					}"
					:icon="{ name: 'pencil-square', placement: 'prepend' }"
				>
					<span class="ms-2 d-sm-inline d-none">Добавить показания</span>
				</app-button>

				<app-button
					class-list-btn="btn-outline-secondary ms-10 px-3"
					:attrs="{
						'data-bs-toggle': 'modal',
						'data-bs-target': '#communalSettingForm',
					}"
					:icon="{ name: 'gear', placement: 'prepend' }"
				>
					<span class="ms-1 d-none d-lg-inline">Тарифы</span>
				</app-button>
			</div>
		</template>

		<app-card :class-list="['mb-30']">
			<template #header>
				<div class="row align-items-center">
					<div
						class="col-xxl mb-0 mb-xl-2 mb-xxl-0 d-flex align-items-center justify-content-between"
					>
						<communal-list-header
							:checkboxes="checkboxes"
							@remove="removeAll"
						/>
					</div>

					<div id="filter" class="col-xxl-auto collapse d-xl-block">
						<communal-filter />
					</div>
				</div>
			</template>

			<communal-list :items="items" :loader="loader" @selected="selectChbx" />

			<!-- <template #footer>-->
			<!-- <app-pagination-->
			<!-- :count="projects.length"-->
			<!-- :pages="PAGE_SIZE"-->
			<!-- v-model="page"-->
			<!-- @changeSize="changePageSize"-->
			<!-- />-->
			<!-- </template>-->
		</app-card>
	</app-page>

	<teleport to="body">
		<app-bs-modal
			v-if="isRates"
			id="addCommunalRecord"
			title="Добавить показания счетчиков"
			:close="closeModal"
			@hide="closeModal = false"
		>
			<communal-form @close="closeModal = true" />
		</app-bs-modal>

		<app-bs-modal
			id="communalSettingForm"
			title="Тарифы"
			:close="closeModal"
			@hide="closeModal = false"
		>
			<communal-settings-form
				v-if="isRates"
				:initials="rates"
				@close="closeModal = true"
			/>
		</app-bs-modal>

		<app-confirm
			ref="confirm"
			:title="'Вы удаляете ' + checkboxes.length + ' элемента'"
			text="Вы уверены? Операцию нельзя будет отменить."
			@resolve="removeAllConfirm"
		/>
	</teleport>
</template>

<script setup>
import CommunalListHeader from '@/components/communal/CommunalListHeader.vue'
import CommunalFilter from '@/components/communal/CommunalFilter.vue'
import CommunalList from '@/components/communal/CommunalList.vue'
import CommunalForm from '@/components/communal/CommunalForm.vue'
import CommunalSettingsForm from '@/components/communal/CommunalSettingsForm.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { isHasKeysObject } from '@/utils/helpers'

const store = useStore()
const closeModal = ref(false)
const loader = ref(true)
const items = computed(() => store.getters['communal/communal'] || [])
const rates = computed(() => store.getters['communal/rates'] || {})
const isRates = ref(null)

// Checkboxes
let checkboxes = ref([])
const confirm = ref(false)

const selectChbx = (checkboxIds) => {
	checkboxes.value = checkboxIds
}

const removeAll = () => {
	confirm.value.confirm = true
}

const removeAllConfirm = async () => {
	try {
		await store.dispatch('communal/delete', checkboxes.value)
		await store.dispatch('communal/load')
		confirm.value.confirm = false
		checkboxes.value.length = 0
	} catch (e) {
		/* empty */
	}
}
// End checkboxes

onMounted(async () => {
	await store.dispatch('communal/load')
	await store.dispatch('communal/loadRates')
	isRates.value = isHasKeysObject(rates.value)
	loader.value = false
})
</script>
