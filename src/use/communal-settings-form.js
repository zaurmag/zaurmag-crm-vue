import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { isHasKeysObject } from '@/utils/helpers'

export function useCommunalSettingsForm(initialValues, emit) {
  const store = useStore()

  const { handleSubmit, resetForm, isSubmitting } = useForm({
    initialValues
  })

  // Electricity
  const {
    value: electr,
    errorMessage: eError,
    handleBlur: eBlur
  } = useField('electr', yup.number().required('Введите тариф электро счетчика'))

  // Gas
  const {
    value: gas,
    errorMessage: gError,
    handleBlur: gBlur
  } = useField('gas', yup.number().required('Введите тариф на газа'))

  // Water
  const {
    value: water,
    errorMessage: wError,
    handleBlur: wBlur
  } = useField('water', yup.number().required('Введите тариф на воду'))

  // Trash
  const {
    value: trash,
    errorMessage: tError,
    handleBlur: tBlur
  } = useField('trash', yup.number().required('Введите тариф на мусор за одного чел.'))

  // Number of people living
  const {
    value: people,
    errorMessage: pError,
    handleBlur: pBlur
  } = useField('people', yup.number().required('Введите количество прописанных людей в доме'))

  // Maintenance of gas equipment
  const {
    value: maintanceGe,
    errorMessage: mgeError,
    handleBlur: mgeBlur
  } = useField(
    'maintanceGe',
    yup.number().required('Введите тариф на обслуживание газового оборудования')
  )

  const onSubmit = handleSubmit(async values => {
    try {
      if (isHasKeysObject(initialValues)) {
        await store.dispatch('communal/updateRates', {
          ...values,
          id: initialValues.id
        })
        emit('submit')

        return
      }

      await store.dispatch('communal/addRates', {
        id: Date.now().toString(),
        ...values
      })
      resetForm()
      emit('submit')
      await store.dispatch('communal/load')
    } catch (e) {
      /* empty */
    }
  })

  return {
    electr,
    eError,
    eBlur,
    gas,
    gError,
    gBlur,
    water,
    wError,
    wBlur,
    trash,
    tError,
    tBlur,
    people,
    pError,
    pBlur,
    maintanceGe,
    mgeError,
    mgeBlur,
    onSubmit,
    isSubmitting
  }
}
