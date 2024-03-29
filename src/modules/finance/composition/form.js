import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { dateF } from '@/utils/date'

export function useFinanceForm(emit, initialValues) {
  const store = useStore()
  const { handleSubmit, handleReset, resetForm, isSubmitting, setFieldValue } = useForm({
    initialValues
  })

  // Date
  const {
    value: date,
    errorMessage: dError,
    handleBlur: dBlur
  } = useField('date', yup.string().required('Введите дату проекта'))

  // Set date initial
  if (!initialValues) {
    setFieldValue('date', dateF(new Date(), { locale: 'sv-SE' }))
  }

  // Title
  const {
    value: title,
    errorMessage: tError,
    handleBlur: tBlur
  } = useField('title', yup.string().required('Введите наименование проекта').trim())

  // Type
  const {
    value: type,
    errorMessage: typeError,
    handleBlur: typeBlur
  } = useField('type', yup.string().required('Выберите тип операции'))

  // Set type initial
  if (initialValues) {
    setFieldValue('type', initialValues.type)
  } else {
    setFieldValue('type', 0)
  }

  // Amount
  const {
    value: amount,
    errorMessage: aError,
    handleBlur: aBlur
  } = useField('amount', yup.number().required('Введите сумму операции'))

  // Description
  const {
    value: desc,
    errorMessage: descError,
    handleBlur: descBlur
  } = useField('desc', yup.string().required('Введите описание проекта'))

  const onSubmit = handleSubmit(async values => {
    try {
      if (initialValues) {
        const data = await store.dispatch('project/update', {
          ...values,
          id: initialValues.id
        })
        emit('submit', data)
        emit('close')
        return
      }

      await store.dispatch('project/add', {
        ...values,
        id: Date.now().toString()
      })
      resetForm()
      setFieldValue('type', '')
      emit('close')
      await store.dispatch('project/load')

      // Set date initial
      setFieldValue('date', dateF(new Date(), { locale: 'sv-SE' }))
    } catch (e) {
      console.error(e)
    }
  })

  return {
    date,
    dError,
    dBlur,
    title,
    tError,
    tBlur,
    type,
    typeError,
    typeBlur,
    amount,
    aError,
    aBlur,
    desc,
    descError,
    descBlur,
    onSubmit,
    handleReset,
    isSubmitting
  }
}
