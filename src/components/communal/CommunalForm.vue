<template>
	<form action="#" @submit.prevent="fields.onSubmit">
		<div class="row mb-30 justify-content-between align-items-center">
			<div class="col-lg-4 col-sm-6 order-2 order-sm-1">
				<form-control
					id="date"
					v-model="fields.date"
					type="date"
					class-list-wrapper="m-0"
					class-list-input="form-control-lg"
					:error="fields.dError"
					@blur="fields.dBlur"
				/>
			</div>
			<div class="col-sm-auto order-1 order-sm-2 mb-3 mb-sm-0">
				<form-checkbox
					id="status"
					v-model="fields.status"
					:label="fields.status ? 'Оплачено' : 'Не оплачено'"
					:class-list-label="fields.status ? 'text-primary' : 'text-secondary'"
				/>
			</div>
		</div>

		<p class="h4 col mb-3">Предыдущие:</p>
		<div class="row g-15 mb-30">
			<form-control
				id="addRecordElPrev"
				v-model="fields.prevElectr"
				label="Электричество"
				type="number"
				class-list-wrapper="col-sm"
				class-list-input="form-control-lg"
				disabled
			/>

			<form-control
				id="addRecordGasPrev"
				v-model.number="fields.prevGas"
				label="Газ"
				type="number"
				class-list-wrapper="col-sm"
				class-list-input="form-control-lg"
				disabled
			/>

			<form-control
				id="addRecordWaterPrev"
				v-model.number="fields.prevWater"
				label="Вода"
				type="number"
				class-list-wrapper="col-sm"
				class-list-input="form-control-lg"
				disabled
			/>
		</div>

		<p class="h4 mb-3">Текущие:</p>
		<div class="row g-15 mb-30">
			<form-control
				id="addRecordEl"
				v-model.number="fields.electr"
				label="Электричество"
				type="number"
				class-list-wrapper="col-sm"
				class-list-input="form-control-lg"
				:error="fields.electrError"
				@blur="fields.electrBlur"
			/>

			<form-control
				id="addRecordGas"
				v-model.number="fields.gas"
				label="Газ"
				type="number"
				class-list-wrapper="col-sm"
				class-list-input="form-control-lg"
				:error="fields.gasError"
				@blur="fields.gasBlur"
			/>

			<form-control
				id="addRecordWater"
				v-model.number="fields.water"
				label="Вода"
				type="number"
				class-list-wrapper="col-sm"
				class-list-input="form-control-lg"
				:error="fields.waterError"
				@blur="fields.waterBlur"
			/>
		</div>

		<p class="h4 mb-3">Итог:</p>
		<div class="row mb-30">
			<div class="col-sm">
				<div class="row">
					<div class="col">
						<span class="fz-16">{{ fields.diffElectr }} кв/ч</span>
						<hr class="my-2" />
					</div>
					<div class="col">
						<span class="fz-16">{{ $currency(fields.electrAmount) }}</span>
						<hr class="my-2" />
					</div>
				</div>
			</div>
			<div class="col-sm">
				<div class="row">
					<div class="col">
						<span class="fz-16">{{ fields.diffGas }} м<sup>3</sup></span>
						<hr class="my-2" />
					</div>
					<div class="col">
						<span class="fz-16">{{ $currency(fields.gasAmount) }} </span>
						<hr class="my-2" />
					</div>
				</div>
			</div>
			<div class="col-sm">
				<div class="row">
					<div class="col">
						<span class="fz-16">{{ fields.diffWater }} м<sup>3</sup></span>
						<hr class="my-2" />
					</div>
					<div class="col">
						<span class="fz-16">{{ $currency(fields.waterAmount) }}</span>
						<hr class="my-2" />
					</div>
				</div>
			</div>
		</div>

		<div class="mb-30">
			<p class="h4 mb-3">К оплате:</p>
			<p class="h3 text-success">{{ $currency(fields.amount) }}</p>
		</div>

		<div class="row g-15 mb-3">
			<div class="col-sm">
				<p class="form-label">Прикрепить фото квитанции</p>
				<div class="f-upload">
					<div class="f-upload__area">
						<app-icon name="image" class-list="f-upload__image" />
						<h5 class="h6 f-upload__title">Перетащите файл сюда</h5>
						<p class="f-upload__desc">или</p>
						<span class="btn btn-primary btn-sm px-3">Загрузите</span>
					</div>
				</div>
			</div>

			<form-control
				id="addRecordDesc"
				v-model="fields.desc"
				label="Описание"
				type="textarea"
				:error="fields.descError"
				class-list-wrapper="col-sm d-flex flex-column"
				class-list-input="form-control-lg h-100"
				@blur="fields.descBlur"
			/>
		</div>

		<div class="text-center">
			<app-button
				class-list-btn="btn-primary w-100 px-4"
				type="submit"
				:animate="{ loading: fields.isSubmitting }"
			>
				Отправить
			</app-button>
		</div>
	</form>
</template>

<script setup>
import { useCommunalForm } from '@/use/communal-form'
import { ref } from 'vue'

// eslint-disable-next-line no-undef
const emit = defineEmits(['close', 'submit'])

// eslint-disable-next-line no-undef
const props = defineProps({
	currentInitial: {
		type: Object,
		required: false,
		default() {
			return {}
		},
	},
})

let { ...fields } = useCommunalForm(props.currentInitial, emit)
fields = ref(fields)
</script>
