import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { toISOString } from '@/utils/date'

export function useCommunalForm (initialValues, emit) {
  const store = useStore()
  const { handleSubmit, handleReset, resetForm, isSubmitting, setFieldValue } = useForm({
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

  // Electricity
  const { value: elctr, errorMessage: elctrError, handleBlur: elctrBlur } = useField(
    'elctr',
    yup
      .number()
      .required('Введите данные электро счетчика')
  )

  // Gas
  const { value: gas, errorMessage: gasError, handleBlur: gasBlur } = useField(
    'gas',
    yup
      .number()
      .required('Введите данные счетчика газа')
  )

  // Water
  const { value: water, errorMessage: waterError, handleBlur: waterBlur } = useField(
    'water',
    yup
      .number()
      .required('Введите данные счетчика воды')
  )

  // Description
  const {
    value: desc,
    errorMessage: descError,
    handleBlur: descBlur
  } = useField('desc')

  const onSubmit = handleSubmit(async values => {
    try {
      console.log(values)
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
        ...values
      })
      resetForm()
      emit('close')
      await store.dispatch('communal/load')

      // Set date initial, when form reset
      setFieldValue(toISOString(new Date()))
    } catch (e) {}
  })

  return {
    status,
    date,
    dError,
    dBlur,
    elctr,
    elctrError,
    elctrBlur,
    gas,
    gasError,
    gasBlur,
    water,
    waterError,
    waterBlur,
    desc,
    descError,
    descBlur,
    onSubmit,
    handleReset,
    isSubmitting
  }
}
