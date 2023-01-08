<template>
	<app-breadcrumb />
	<div
		v-if="!communal"
		class="position-relative d-flex align-items-center"
		style="height: 400px"
	>
		<app-loader />
	</div>

	<app-page v-else class-list-header="d-block">
		<template #header>
			<div class="row align-items-center g-20">
				<div class="col-sm d-flex align-items-center">
					<h1 class="h3 main__header-tlt">
						{{ $dateF(communal.date, { month: 'long' }) + ' г.' }}
					</h1>
					<div class="ms-3 d-none d-sm-block text-nowrap">
						<app-indicator
							:class-list="[
								'me-2 indicator--lg',
								`${communal.status ? 'bg-success' : 'bg-warning'}`,
							]"
						/>
						<span class="fz-16">{{
							communal.status ? 'Оплачено' : 'Не оплачено'
						}}</span>
					</div>
				</div>

				<div
					class="col-sm-auto d-flex align-items-center justify-content-between"
				>
					<div class="me-3 d-sm-none">
						<app-indicator
							:class-list="[
								'me-10 indicator--lg',
								`${communal.status ? 'bg-success' : 'bg-warning'}`,
							]"
						/>
						<span class="fz-16">{{
							communal.status ? 'Оплачено' : 'Не оплачено'
						}}</span>
					</div>
					<div class="d-flex align-items-center">
						<app-button
							class-list-btn="btn-primary px-3"
							:attrs="{
								'data-bs-toggle': 'modal',
								'data-bs-target': '#editRecordForm',
							}"
							:icon="{
								name: 'pencil-square',
								placement: 'prepend',
								classList: 'me-1 d-none d-lg-inline',
							}"
							>Редактировать</app-button
						>

						<app-button
							class-list-btn="btn-outline-danger px-3 ms-10"
							:attrs="{
								'data-bs-toggle': 'modal',
								'data-bs-target': '#confirm',
							}"
							:icon="{
								name: 'trash',
								placement: 'prepend',
								classList: 'me-1 d-none d-lg-inline',
							}"
							>Удалить</app-button
						>

						<app-button
							class-list-btn="btn-outline-secondary ms-10 px-3"
							:attrs="{
								'data-bs-toggle': 'modal',
								'data-bs-target': '#communalSettingForm',
							}"
							:icon="{
								name: 'gear',
								placement: 'prepend',
								classList: 'me-1 d-none d-lg-inline',
							}"
							>Тарифы</app-button
						>
					</div>
				</div>
			</div>
		</template>

		<app-card class-list-body="pt-sm-25">
			<h2 class="h4 mb-xxl-30">Сумма: {{ $currency(communal.amount) }}</h2>
			<div class="row g-15 mb-30 justify-content-center">
				<div class="col-xxl col-lg-6 col-md-4 col-sm-6">
					<app-card class-list="card--green h-100" class-list-body="p-25">
						<h3 class="card-subtitle">Электричество, квт/ч</h3>
						<p>
							Предыдущие:
							<span class="fz-16">{{
								$currency(prevData.electr.current, { style: 'decimal' })
							}}</span>
						</p>
						<p>
							Текущие:
							<span class="fz-16">{{
								$currency(communal.electr.current, { style: 'decimal' })
							}}</span>
						</p>
						<p>
							Разница:
							<span class="fz-16">{{
								$currency(communal.electr.diff, { style: 'decimal' })
							}}</span>
						</p>
						<p class="m-0">
							Сумма:
							<span class="fw-medium fz-16">{{
								$currency(communal.electr.amount)
							}}</span>
						</p>
					</app-card>
				</div>
				<div class="col-xxl col-lg-6 col-md-4 col-sm-6">
					<app-card class-list="card--yellow h-100" class-list-body="p-25">
						<h3 class="card-subtitle">Газ, м<sup>3</sup></h3>
						<p>
							Предыдущие:
							<span class="fz-16">{{
								$currency(prevData.gas.current, { style: 'decimal' })
							}}</span>
						</p>
						<p>
							Текущие:
							<span class="fz-16">{{
								$currency(communal.gas.current, { style: 'decimal' })
							}}</span>
						</p>
						<p>
							Разница:
							<span class="fz-16">{{
								$currency(communal.gas.diff, { style: 'decimal' })
							}}</span>
						</p>
						<p class="m-0">
							Сумма:
							<span class="fw-medium fz-16">{{
								$currency(communal.gas.amount)
							}}</span>
						</p>
					</app-card>
				</div>
				<div class="col-xxl col-lg-6 col-md-4 col-sm-6">
					<app-card class-list="card--blue h-100" class-list-body="p-25">
						<h3 class="card-subtitle">Вода, м<sup>3</sup></h3>
						<p>
							Предыдущие:
							<span class="fz-16">{{
								$currency(prevData.water.current, { style: 'decimal' })
							}}</span>
						</p>
						<p>
							Текущие:
							<span class="fz-16">{{
								$currency(communal.water.current, { style: 'decimal' })
							}}</span>
						</p>
						<p>
							Разница:
							<span class="fz-16">{{
								$currency(communal.water.diff, { style: 'decimal' })
							}}</span>
						</p>
						<p class="m-0">
							Сумма:
							<span class="fw-medium fz-16">{{
								$currency(communal.water.amount)
							}}</span>
						</p>
					</app-card>
				</div>
				<div class="col-xxl col-lg-6 col-md-4 col-sm-6">
					<app-card class-list="card--gray h-100" class-list-body="p-25">
						<h3 class="card-subtitle">Мусор</h3>
						<p>
							Количество человек:
							<span class="fz-16">{{ communal.trash.people }}</span>
						</p>
						<p class="m-0">
							Сумма:
							<span class="fw-medium fz-16">{{
								$currency(communal.trash.amount)
							}}</span>
						</p>
					</app-card>
				</div>
				<div class="col-xxl col-lg-6 col-md-4 col-sm-6">
					<app-card class-list="card--gray h-100" class-list-body="p-25">
						<h3 class="card-subtitle">Обсл. газ. оборуд.</h3>
						<p class="m-0">
							Сумма:
							<span class="fw-medium fz-16">{{
								$currency(communal.maintanceGe)
							}}</span>
						</p>
					</app-card>
				</div>
			</div>
			<div class="row">
				<div v-if="communal.desc" class="col-sm">
					<p><strong>Описание</strong></p>
					<p class="mw-md-50">{{ communal.desc }}</p>
				</div>
				<!--            <div class="col-sm">-->
				<!--              <p><strong>Фото квитанции</strong></p>-->
				<!--              <button class="btn btn-empty p-0" type="button" data-bs-toggle="modal" data-bs-target="#openModalImage">-->
				<!--                <img class="img-fluid" src="./images/foto-zhkh.jpg" alt="Фото квитанции ЖКХ">-->
				<!--              </button>-->
				<!--            </div>-->
			</div>
		</app-card>
	</app-page>

	<teleport to="body">
		<app-bs-modal
			v-if="isRates"
			id="editRecordForm"
			title="Редактировать показания счетчиков"
			:close="closeModal"
			class-list-wrapper="modal-lg"
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

		<!-- <app-confirm-->
		<!-- ref="confirm"-->
		<!-- :title="'Вы удаляете ' + checkboxes.length + ' элемента'"-->
		<!-- text="Вы уверены? Операцию нельзя будет отменить."-->
		<!-- @resolve="removeAllConfirm"-->
		<!-- />-->
	</teleport>
</template>

<script setup>
import CommunalForm from '@/components/communal/CommunalForm.vue'
import CommunalSettingsForm from '@/components/communal/CommunalSettingsForm.vue'
import breadcrumbs from '@/use/breadcrumb'
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { dateF } from '@/utils/date'

const route = useRoute()
const store = useStore()
const communal = ref(null)
const closeModal = ref(false)
const isRates = ref(null)
const rates = computed(() => store.getters['communal/rates'] || {})
const prevData = computed(() => store.getters['communal/prevData'] || {})

onMounted(async () => {
	await store.dispatch('communal/load')
	await store.dispatch('communal/loadRates')
	isRates.value = Object.keys(rates.value).length
	communal.value =
		(await store.getters['communal/communalById'](route.params.id)) || {}
	const title = dateF(communal.value.date) + ' г.'
	breadcrumbs.setCurrentBreadcrumbName(title)
})

breadcrumbs.setCurrentBreadcrumbName('')
</script>
