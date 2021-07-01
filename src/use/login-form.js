import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export function useLoginForm () {
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const { handleSubmit, isSubmitting, submitCount } = useForm()

  const { value: email, errorMessage: eError, handleBlur: eBlur } = useField(
    'email',
    yup
      .string()
      .required('Введите E-mail')
      .trim()
      .email('Введите валидный E-mail')
  )
  const PASS_MINLENGTH = 3
  const { value: password, errorMessage: pError, handleBlur: pBlur } = useField(
    'password',
    yup
      .string()
      .required('Введите пароль')
      .trim()
      .min(
        PASS_MINLENGTH,
        `Пароль должен содержать не менее ${PASS_MINLENGTH} символов`
      )
  )

  const isToManyAttempts = computed(() => submitCount.value >= 3)
  watch(isToManyAttempts, val => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500)
    }
  })

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      await router.push('/')
    } catch (e) {}
  })

  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    isToManyAttempts,
    isSubmitting,
    onSubmit
  }
}
