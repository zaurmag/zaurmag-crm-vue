import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { dateF } from '@/utils/date'

export function useCommunalForm (emit, initialValues) {
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

      // await store.dispatch('project/add', {
      //   ...values,
      //   id: Date.now().toString()
      // })
      // resetForm()
      // setFieldValue('type', '')
      // emit('close')
      // await store.dispatch('project/load')

      // Set date initial
      setFieldValue('date', dateF(new Date(), { locale: 'sv-SE' }))
    } catch (e) {
      console.error(e)
    }
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
