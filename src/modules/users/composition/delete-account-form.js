import { useStore } from 'vuex'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'

export function useDeleteAccountForm(user) {
  const router = useRouter()
  const store = useStore()
  const { handleSubmit, isSubmitting: isSubmittingDelAcc } = useForm()

  const {
    value: delAcc,
    errorMessage: delAccError,
    handleBlur: delAccBlur
  } = useField('delAcc', yup.string().required('Введите подтверждающее слово!').trim())

  const onSubmitDelAcc = handleSubmit(async ({ delAcc }) => {
    try {
      if (user.value.role === 'admin' || user.value.role === 'demo') {
        await store.dispatch('setMessage', {
          value: 'У вас нет прав для удаления данного аккаунта!',
          type: 'danger'
        })

        return
      }

      if (delAcc.toLowerCase() === 'delete') {
        await store.dispatch('users/deleteAccount')
        await router.push({ name: 'Home' })
      } else {
        await store.dispatch('setMessage', {
          value: 'Неправильно введено проверочное слово!',
          type: 'danger'
        })
      }
    } catch (e) {}
  })

  return {
    delAcc,
    delAccError,
    delAccBlur,
    onSubmitDelAcc,
    isSubmittingDelAcc
  }
}
