import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { dateF } from '@/utils/date'

export function useCommunalForm (initialValues, emit) {
  const store = useStore()
  const { handleSubmit, resetForm, isSubmitting, setFieldValue } = useForm({
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
  setFieldValue('date', dateF(new Date(), { locale: 'fr-CA' }))

  // Electricity
  const { value: elctr, errorMessage: elctrError, handleBlur: elctrBlur } = useField(
    'elctr',
    yup
      .number()
      .required('Введите данные электро счетчика')
  )
  setFieldValue('elctr', 0)

  // Gas
  const { value: gas, errorMessage: gasError, handleBlur: gasBlur } = useField(
    'gas',
    yup
      .number()
      .required('Введите данные счетчика газа')
  )
  setFieldValue('gas', 0)

  // Water
  const { value: water, errorMessage: waterError, handleBlur: waterBlur } = useField(
    'water',
    yup
      .number()
      .required('Введите данные счетчика воды')
  )
  setFieldValue('water', 0)

  // Description
  const {
    value: desc,
    errorMessage: descError,
    handleBlur: descBlur
  } = useField('desc')

  const prevInitial = computed(() => store.getters['communal/prevData'] || {})
  const prevElctr = computed(() => prevInitial.value.elctr || 0)
  const prevGas = computed(() => prevInitial.value.gas || 0)
  const prevWater = computed(() => prevInitial.value.water || 0)

  // Different
  const diffElectr = computed(() => elctr.value === 0 ? elctr.value : elctr.value - prevElctr.value)
  const diffGas = computed(() => gas.value === 0 ? gas.value : gas.value - prevGas.value)
  const diffWater = computed(() => water.value === 0 ? water.value : water.value - prevWater.value)

  // Calculate
  const electrCalc = computed(() => store.getters['communal/electrCalc'](diffElectr.value))
  const gasCalc = computed(() => store.getters['communal/gasCalc'](diffGas.value))
  const waterCalc = computed(() => store.getters['communal/waterCalc'](diffWater.value))
  const trash = computed(() => store.getters['communal/trashCalc'])
  const maintanceGe = computed(() => store.getters['communal/maintanceGe'])
  const amount = computed(() => electrCalc.value + gasCalc.value + waterCalc.value + trash.value + maintanceGe.value)

  const onSubmit = handleSubmit(async values => {
    try {
      const date = new Date()
      const dateNow = values.date + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

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
        ...values,
        trash: trash.value,
        amount: amount.value,
        date: dateNow
      })
      resetForm()
      emit('close')
      await store.dispatch('communal/load')

      // Set date initial, when form reset
      setFieldValue('date', dateF(new Date(), { locale: 'fr-CA' }))
    } catch (e) {}
  })

  return {
    status,
    date,
    dError,
    dBlur,
    prevElctr,
    prevGas,
    prevWater,
    elctr,
    elctrError,
    elctrBlur,
    gas,
    gasError,
    gasBlur,
    water,
    waterError,
    waterBlur,
    electrCalc,
    gasCalc,
    waterCalc,
    diffElectr,
    diffGas,
    diffWater,
    amount,
    desc,
    descError,
    descBlur,
    onSubmit,
    isSubmitting
  }
}
