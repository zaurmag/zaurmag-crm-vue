import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export function useRegisterForm(emit) {
  const router = useRouter()
  const store = useStore()
  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const {
    value: name,
    errorMessage: nError,
    handleBlur: nBlur
  } = useField('name', yup.string().required('Введите Ваше имя'))

  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur
  } = useField(
    'email',
    yup.string().required('Введите E-mail').trim().email('Введите валидный E-mail')
  )
  const PASS_MINLENGTH = 3
  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur
  } = useField(
    'password',
    yup
      .string()
      .required('Введите пароль')
      .trim()
      .min(PASS_MINLENGTH, `Пароль должен содержать не менее ${PASS_MINLENGTH} символов`)
  )

  const {
    value: password2,
    errorMessage: p2Error,
    handleBlur: p2Blur
  } = useField(
    'password2',
    yup
      .string()
      .required('Повторите пароль')
      .trim()
      .min(PASS_MINLENGTH, `Пароль должен содержать не менее ${PASS_MINLENGTH} символов`)
  )

  const isToManyAttempts = computed(() => submitCount.value >= 3)
  watch(isToManyAttempts, val => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500)
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

      await store.dispatch('users/signUp', {
        name: values.name,
        email: values.email,
        password: values.password
      })

      emit('complete')
      await router.push('/')
    } catch (e) {}
  })

  return {
    name,
    nError,
    nBlur,
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    password2,
    p2Error,
    p2Blur,
    isToManyAttempts,
    isSubmitting,
    onSubmit
  }
}
