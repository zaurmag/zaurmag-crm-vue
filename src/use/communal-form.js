import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { dateF } from '@/utils/date'

export function useCommunalForm(initialValues, emit) {
	const store = useStore()
	const { handleSubmit, resetForm, isSubmitting, setFieldValue } = useForm({
		initialValues
	})

	// Status
	const { value: status } = useField('status')

	// Date
	const { value: date, errorMessage: dError, handleBlur: dBlur } = useField(
		'date',
		yup
			.string()
			.required('Введите дату платежа')
	)
	setFieldValue('date', dateF(new Date(), { locale: 'fr-CA' }))

	// Electricity
	const { value: electr, errorMessage: electrError, handleBlur: electrBlur } = useField(
		'electr',
		yup
			.number()
			.required('Введите данные электро счетчика')
	)
	setFieldValue('electr', 0)

	// Gas
	const { value: gas, errorMessage: gasError, handleBlur: gasBlur } = useField(
		'gas',
		yup
			.number()
			.required('Введите данные счетчика газа')
	)
	setFieldValue('gas', 0)

	// Water
	const { value: water, errorMessage: waterError, handleBlur: waterBlur } = useField(
		'water',
		yup
			.number()
			.required('Введите данные счетчика воды')
	)
	setFieldValue('water', 0)

	// Description
	const {
		value: desc,
		errorMessage: descError,
		handleBlur: descBlur
	} = useField('desc')

	const prevInitial = computed(() => store.getters['communal/prevData'] ?? {})
	const rates = computed(() => store.getters['communal/rates'] ?? {})
	const prevElectr = computed(() => prevInitial.value.electr.current || 0)
	const prevGas = computed(() => prevInitial.value.gas.current || 0)
	const prevWater = computed(() => prevInitial.value.water.current || 0)

	// Different
	const diffElectr = computed(() => {
		if (electr.value === 0) {
			return 0
		}

		return electr.value - prevElectr.value
	})
	const diffGas = computed(() => {
		if (gas.value === 0) {
			return 0
		}

		return gas.value - prevGas.value
	})

	const diffWater = computed(() => {
		if (water.value === 0) {
			return 0
		}

		return water.value - prevWater.value
	})

	// Calculate
	const electrAmount = computed(() => diffElectr.value * rates.value.electr)
	const gasAmount = computed(() => diffGas.value * rates.value.gas)
	const waterAmount = computed(() => diffWater.value * rates.value.water)
	const trash = computed(() => rates.value.people * rates.value.trash)
	const amount = computed(() => {
		return electrAmount.value + gasAmount.value + waterAmount.value + trash.value + rates.value.maintanceGe
	})

	const onSubmit = handleSubmit(async values => {
		try {
			const dateObj = new Date()
			const dateNow = `${values.date} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`

			// if (initialValues) {
			//   const data = await store.dispatch('project/update', {
			//     ...values,
			//     id: initialValues.id
			//   })
			//   emit('submit', data)
			//   emit('close')
			//   return
			// }

			await store.dispatch('communal/add', {
				id: Date.now().toString(),
				desc: desc.value,
				status: status.value,
				electr: {
					current: electr.value,
					diff: diffElectr.value,
					rate: rates.value.electr,
					amount: electrAmount.value
				},
				gas: {
					current: gas.value,
					diff: diffGas.value,
					rate: rates.value.gas,
					amount: gasAmount.value
				},
				water: {
					current: water.value,
					diff: diffWater.value,
					rate: rates.value.water,
					amount: waterAmount.value
				},
				trash: {
					people: rates.value.people,
					rate: rates.value.trash,
					amount: trash.value
				},
				amount: amount.value,
				date: dateNow
			})

			resetForm()
			emit('close')
			await store.dispatch('communal/load')

			// Set date initial, when form reset
			setFieldValue('date', dateF(new Date(), { locale: 'fr-CA' }))
		} catch (e) { /* empty */ }
	})

	return {
		status,
		date,
		dError,
		dBlur,
		prevElectr,
		prevGas,
		prevWater,
		electr,
		electrError,
		electrBlur,
		gas,
		gasError,
		gasBlur,
		water,
		waterError,
		waterBlur,
		electrAmount,
		gasAmount,
		waterAmount,
		diffElectr,
		diffGas,
		diffWater,
		amount,
		desc,
		descError,
		descBlur,
		onSubmit,
		isSubmitting
	}
}
