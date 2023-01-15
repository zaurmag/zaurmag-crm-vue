<template>
	<form action="#" @submit.prevent="onSubmit">
		<form-control
			id="zhkhEl"
			v-model.number="electr"
			type="text"
			label="Электричество, 1 кв/ч, руб."
			class-list-input="form-control-lg"
			:error="eError"
			@blur="eBlur"
		/>
		<form-control
			id="zhkhGas"
			v-model.number="gas"
			type="text"
			label="Газ, 1 куб/м, руб."
			class-list-input="form-control-lg"
			:error="gError"
			@blur="gBlur"
		/>
		<form-control
			id="zhkhWater"
			v-model.number="water"
			type="text"
			label="Вода с канализацией, 1 куб/м, руб."
			class-list-input="form-control-lg"
			:error="wError"
			@blur="wBlur"
		/>

		<div class="mb-3 row">
			<p class="form-label">Мусор</p>
			<form-control
				id="zhkhTrashTarif"
				v-model.number="trash"
				type="text"
				label="1 чел., руб."
				class-list-input="form-control-lg"
				class-list-wrapper="col"
				:error="tError"
				@blur="tBlur"
			/>
			<form-control
				id="zhkhTrashPropisano"
				v-model.number="people"
				type="text"
				label="Прописано, чел."
				class-list-input="form-control-lg"
				class-list-wrapper="col"
				:error="pError"
				@blur="pBlur"
			/>
		</div>
		<form-control
			id="zhkhGasObsl"
			v-model.number="maintanceGe"
			type="text"
			label="Обслуживание газ. оборудования, руб."
			class-list-input="form-control-lg"
			:error="mgeError"
			@blur="mgeBlur"
		/>

		<app-button
			class-list-wrapper="w-100"
			class-list-btn="btn-primary w-100 px-3"
			type="submit"
			:animate="{ loading: isSubmitting }"
		>
			Сохранить
		</app-button>
	</form>
</template>

<script>
import { useCommunalSettingsForm } from '@/use/communal-settings-form'

export default {
	name: 'CommunalSettingsForm',
	props: {
		initials: {
			type: Object,
			required: true,
		},
	},
	emits: ['submit'],
	setup(props, { emit }) {
		return {
			...useCommunalSettingsForm(props.initials, emit),
		}
	},
}
</script>
