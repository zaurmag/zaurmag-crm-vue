import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { dateF } from '@/utils/date'

export function useCommunalForm() {
	const { handleSubmit, resetForm, isSubmitting, setFieldValue } = useForm()

	// Status
	const { value: status } = useField('status')

	// Date
	const {
		value: date,
		errorMessage: dError,
		handleBlur: dBlur,
	} = useField('date', yup.string().required('Введите дату платежа'))
	setFieldValue('date', dateF(new Date(), { locale: 'fr-CA' }))

	// Electricity
	const {
		value: electr,
		errorMessage: electrError,
		handleBlur: electrBlur,
	} = useField(
		'electr',
		yup.number().required('Введите данные электро счетчика')
	)
	setFieldValue('electr', 0)

	// Gas
	const {
		value: gas,
		errorMessage: gasError,
		handleBlur: gasBlur,
	} = useField('gas', yup.number().required('Введите данные счетчика газа'))
	setFieldValue('gas', 0)

	// Water
	const {
		value: water,
		errorMessage: waterError,
		handleBlur: waterBlur,
	} = useField('water', yup.number().required('Введите данные счетчика воды'))
	setFieldValue('water', 0)

	// Description
	const {
		value: desc,
		errorMessage: descError,
		handleBlur: descBlur,
	} = useField('desc')

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
