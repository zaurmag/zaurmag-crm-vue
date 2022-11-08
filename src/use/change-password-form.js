import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'

export function useChangePasswordForm () {
  const store = useStore()
  const { handleSubmit, isSubmitting: isSubmittingPass, submitCount } = useForm()

  const PASS_MINLENGTH = 3
  const { value: chPass, errorMessage: chPassError, handleBlur: chBlurPass } = useField(
    'chPass',
    yup
      .string()
      .required('Введите пароль')
      .trim()
      .min(
        PASS_MINLENGTH,
        `Пароль должен содержать не менее ${PASS_MINLENGTH} символов`
      )
  )

  const { value: chPass2, errorMessage: chPassError2, handleBlur: chBlurPass2 } = useField(
    'chPass2',
    yup
      .string()
      .required('Повторите пароль')
      .trim()
      .min(
        PASS_MINLENGTH,
        `Пароль должен содержать не менее ${PASS_MINLENGTH} символов`
      )
  )

  const isToManyAttemptsPass = computed(() => submitCount.value >= 3)
  watch(isToManyAttemptsPass, val => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500)
    }
  })

  const onSubmitPass = handleSubmit(async ({ chPass, chPass2 }) => {
    if (chPass !== chPass2) {
      await store.dispatch('setMessage', {
        value: 'Пароли должны совпадать!',
        type: 'danger'
      })

      return
    }

    try {
      await store.dispatch('users/changePassword', { password: chPass })
    } catch (e) {}
  })

  return {
    chPass,
    chPassError,
    chBlurPass,
    chPass2,
    chPassError2,
    chBlurPass2,
    isToManyAttemptsPass,
    isSubmittingPass,
    onSubmitPass
  }
}
