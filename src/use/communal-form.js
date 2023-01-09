import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { dateF } from '@/utils/date'
// import { watch, toRef } from 'vue'

export function useCommunalForm(initial) {
	const { handleSubmit, resetForm, isSubmitting, setFieldValue } = useForm({
		initialValues: {
			date:
				dateF(initial.date, { locale: 'fr-CA' }) ??
				dateF(new Date(), { locale: 'fr-CA' }),
			status: initial?.status ?? false,
			electr: initial?.electr?.current ?? 0,
			gas: initial?.gas?.current ?? 0,
			water: initial?.water?.current ?? 0,
			desc: initial.desc,
		},
	})

	// Status
	const { value: status } = useField('status')

	// Date
	const {
		value: date,
		errorMessage: dError,
		handleBlur: dBlur,
	} = useField('date', yup.string().required('Введите дату платежа'))

	// Electricity
	const {
		value: electr,
		errorMessage: electrError,
		handleBlur: electrBlur,
	} = useField(
		'electr',
		yup.number().required('Введите данные электро счетчика')
	)

	// Gas
	const {
		value: gas,
		errorMessage: gasError,
		handleBlur: gasBlur,
	} = useField('gas', yup.number().required('Введите данные счетчика газа'))

	// Water
	const {
		value: water,
		errorMessage: waterError,
		handleBlur: waterBlur,
	} = useField('water', yup.number().required('Введите данные счетчика воды'))

	// Description
	const {
		value: desc,
		errorMessage: descError,
		handleBlur: descBlur,
	} = useField('desc')

	// watch(initial, (val) => {
	// 	if (!val) {
	// 		setFieldValue('date', dateF(new Date(), { locale: 'fr-CA' }))
	// 		setFieldValue('electr', 0)
	// 		setFieldValue('gas', 0)
	// 		setFieldValue('water', 0)
	// 	}
	// })

	return {
		status,
		date,
		dError,
		dBlur,
		electr,
		electrError,
		electrBlur,
		gas,
		gasError,
		gasBlur,
		water,
		waterError,
		waterBlur,
		desc,
		descError,
		descBlur,
		handleSubmit,
		resetForm,
		setFieldValue,
		isSubmitting,
	}
}
