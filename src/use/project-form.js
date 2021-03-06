import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'

function _formatDate (date) {
  let dd = date.getDate()
  if (dd < 10) dd = '0' + dd

  let mm = date.getMonth() + 1
  if (mm < 10) mm = '0' + mm

  let yy = date.getFullYear()
  if (yy < 10) yy = '0' + yy

  return yy + '-' + mm + '-' + dd
}

export function useProjectForm (emit, initialValues) {
  const store = useStore()
  const { handleSubmit, handleReset, resetForm, setFieldValue } = useForm({
    initialValues
  })

  // Date
  const { value: date, errorMessage: dError, handleBlur: dBlur } = useField(
    'date',
    yup.string().required('Введите дату проекта')
  )

  if (!initialValues) {
    setFieldValue('date', _formatDate(new Date()))
  }

  // Title
  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    'title',
    yup
      .string()
      .required('Введите наименование проекта')
      .trim()
  )

  // Type
  const {
    value: type,
    errorMessage: typeError,
    handleBlur: typeBlur
  } = useField('type', yup.string().required('Выберите тип операции'))

  // Amount
  const { value: amount, errorMessage: aError, handleBlur: aBlur } = useField(
    'amount',
    yup.number().required('Введите сумму операции')
  )

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
      emit('close')
      await store.dispatch('project/load')
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
    handleReset
  }
}
