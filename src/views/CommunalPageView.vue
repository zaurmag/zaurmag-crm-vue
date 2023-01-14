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
								'data-bs-target': '#removeConfirm',
							}"
							:icon="{
								name: 'trash',
								placement: 'prepend',
								classList: 'me-1 d-none d-lg-inline',
							}"
							@click="remove"
							>Удалить</app-button
						>
					</div>
				</div>
			</div>
		</template>

		<app-card class-list-body="pt-sm-25">
			<h2 class="h4 mb-xxl-30">Сумма: {{ $currency(communal.amount) }}</h2>

			<div class="row g-15 mb-30 justify-content-center">
				<communal-full-page-card
					title="Электричество, квт/ч"
					:amount="communal.electr.amount"
					:rate="communal.electr.rate"
					:diff="communal.electr.diff"
					:current="communal.electr.current"
					:prev="communal.electr.prev"
					color="green"
				/>

				<communal-full-page-card
					title="Газ, м<sup>3</sup>"
					:amount="communal.gas.amount"
					:rate="communal.gas.rate"
					:diff="communal.gas.diff"
					:current="communal.gas.current"
					:prev="communal.gas.prev"
					color="yellow"
				/>

				<communal-full-page-card
					title="Вода, м<sup>3</sup>"
					:amount="communal.water.amount"
					:rate="communal.water.rate"
					:diff="communal.water.diff"
					:current="communal.water.current"
					:prev="communal.water.prev"
					color="blue"
				/>

				<communal-full-page-card
					title="Мусор"
					:amount="communal.trash.amount"
					:rate="communal.trash.rate"
					:people="communal.trash.people"
					color="gray"
				/>

				<communal-full-page-card
					title="Обсл. газ. оборуд."
					:amount="communal.maintanceGe"
					color="green"
				/>
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
			id="editRecordForm"
			title="Редактировать показания счетчиков"
			:close="modal"
			@hide="modal = false"
		>
			<communal-form v-if="communal" :initial="communal" @close="closeModal" />
		</app-bs-modal>

		<app-confirm
			v-if="communal"
			id="removeConfirm"
			:title="'Дата от ' + $dateF(communal.date, { month: 'long' }) + ' г.'"
			text="Вы удаляете запись. Уверены? Операцию нельзя будет отменить."
			@resolve="removeConfirm"
		/>
	</teleport>
</template>

<script setup>
import CommunalForm from '@/components/communal/CommunalForm.vue'
import CommunalFullPageCard from '@/components/communal/CommunalFullPageCard.vue'
import breadcrumbs from '@/use/breadcrumb'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { dateF } from '@/utils/date'

const route = useRoute()
const router = useRouter()
const store = useStore()
const communal = ref(null)
const modal = ref(false)
const confirm = ref(false)
const id = route.params.id

const remove = () => {
	confirm.value = true
}

const removeConfirm = async () => {
	await store.dispatch('communal/delete', id)
	await router.push({ name: 'Communal' })
	modal.value = true
}

const closeModal = async () => {
	communal.value = await store.dispatch('communal/loadOne', id)
	modal.value = true
}

onMounted(async () => {
	await store.dispatch('communal/loadRates')
	communal.value = await store.dispatch('communal/loadOne', id)
	const title = dateF(communal.value.date) + ' г.'
	breadcrumbs.setCurrentBreadcrumbName(title)
})

breadcrumbs.setCurrentBreadcrumbName('')
</script>
