import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export function useEditProfileForm(initialValues) {
  const store = useStore()
  const { handleSubmit, isSubmitting, submitCount } = useForm({ initialValues })

  // Name
  const {
    value: name,
    errorMessage: nError,
    handleBlur: nBlur
  } = useField('name', yup.string().required('Введите Ваше имя'))

  // Address
  const {
    value: address,
    errorMessage: aError,
    handleBlur: aBlur
  } = useField('address', yup.string())

  // Phone
  const {
    value: phone,
    errorMessage: pnError,
    handleBlur: pnBlur
  } = useField('phone', yup.number())

  // E-mail
  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur
  } = useField(
    'email',
    yup.string().required('Введите E-mail').trim().email('Введите валидный E-mail')
  )

  // About
  const {
    value: description,
    errorMessage: dsError,
    handleBlur: dsBlur
  } = useField('description', yup.string())

  const isToManyAttempts = computed(() => submitCount.value >= 3)
  watch(isToManyAttempts, val => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 3000)
    }
  })

  const onSubmit = handleSubmit(async values => {
    try {
      if (values.password !== values.password2) {
        await store.dispatch('setMessage', {
          value: 'Пароли должны совпадать',
          type: 'danger'
        })

        return
      }
      await store.dispatch('users/update', {
        id: initialValues.value.id,
        name: values.name,
        address: values.address,
        phone: values.phone,
        email: values.email,
        description: values.description
      })
    } catch (e) {}
  })

  return {
    name,
    nError,
    nBlur,
    address,
    aError,
    aBlur,
    description,
    dsError,
    dsBlur,
    phone,
    pnError,
    pnBlur,
    email,
    eError,
    eBlur,
    // password,
    // pError,
    // pBlur,
    // password2,
    // p2Error,
    // p2Blur,
    isToManyAttempts,
    isSubmitting,
    onSubmit
  }
}
