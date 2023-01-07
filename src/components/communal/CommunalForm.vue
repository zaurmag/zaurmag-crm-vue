<template>
	<form action="#" @submit.prevent="onSubmit">
		<div class="row mb-30 align-items-center">
			<div class="col-sm mb-3 mb-sm-0">
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
			<div class="col-sm d-flex justify-content-sm-end">
				<form-checkbox
					id="status"
					v-model="fields.status"
					:label="fields.status ? 'Оплачено' : 'Не оплачено'"
					:class-list-label="fields.status ? 'text-primary' : 'text-secondary'"
				/>
			</div>
		</div>

		<form-control
			id="addRecordEl"
			v-model.number="fields.electr"
			label="Электричество"
			type="number"
			class-list-input="form-control-lg"
			:error="fields.electrError"
			@blur="fields.electrBlur"
		/>

		<form-control
			id="addRecordGas"
			v-model.number="fields.gas"
			label="Газ"
			type="number"
			class-list-input="form-control-lg"
			:error="fields.gasError"
			@blur="fields.gasBlur"
		/>

		<form-control
			id="addRecordWater"
			v-model.number="fields.water"
			label="Вода"
			type="number"
			class-list-input="form-control-lg"
			:error="fields.waterError"
			@blur="fields.waterBlur"
		/>

		<form-control
			id="addRecordDesc"
			v-model="fields.desc"
			label="Описание"
			type="textarea"
			:error="fields.descError"
			class-list-input="form-control-lg h-100"
			@blur="fields.descBlur"
		/>

		<div class="mb-3">
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

		<div class="text-center mt-30">
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
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useCalcCommunalData } from '@/use/calc-communal-data'

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

const store = useStore()
let { ...fields } = useCommunalForm(props.currentInitial, emit)
fields = reactive(fields)

const prevData = computed(() => store.getters['communal/prevData'] ?? {})
const rates = computed(() => store.getters['communal/rates'] ?? {})

const onSubmit = fields.handleSubmit(
	async ({ date, status = false, desc = '' }) => {
		try {
			const dateNow = new Date()
			const fullDate = `${date} ${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}`

			const { ...calcData } = useCalcCommunalData(
				fields.electr,
				fields.gas,
				fields.water,
				prevData,
				rates
			)

			await store.dispatch('communal/add', {
				id: Date.now().toString(),
				date: fullDate,
				status,
				desc,
				...calcData,
			})

			emit('close')
			await store.dispatch('communal/load')
		} catch (e) {
			/* empty */
		}
	}
)
</script>
