import * as yup from 'yup'
import { dateF } from '@/utils/date'
import { useCalcCommunalData } from './calc-communal-data'
import { useField, useForm } from 'vee-validate'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { isHasKeysObject } from '@/utils/common'

export function useCommunalForm(currInitial, prevInitial, emit, imageDownloadUrl) {
  const store = useStore()

  const { handleSubmit, resetForm, isSubmitting, setFieldValue } = useForm({
    initialValues: {
      date: currInitial.date
        ? dateF(currInitial.date, { locale: 'fr-CA' })
        : dateF(new Date(), { locale: 'fr-CA' }),
      status: currInitial?.status ?? false,
      prevElectr: prevInitial?.electr?.current ?? currInitial?.electr?.prev,
      prevGas: prevInitial?.gas?.current ?? currInitial?.gas?.prev,
      prevWater: prevInitial?.water?.current ?? currInitial?.water?.prev,
      electr: currInitial?.electr?.current ?? 0,
      gas: currInitial?.gas?.current ?? 0,
      water: currInitial?.water?.current ?? 0,
      desc: currInitial.desc
    }
  })

  const rates = computed(() => store.getters['communal/rates'] || {})

  // Status
  const { value: status } = useField('status')

  // Date
  const {
    value: date,
    errorMessage: dError,
    handleBlur: dBlur
  } = useField('date', yup.string().required('Введите дату платежа'))

  // ---- ** ---- PREV DATA ---- ** ---- //
  // Electricity
  const {
    value: prevElectr,
    errorMessage: prevElectrError,
    handleBlur: prevElectrBlur
  } = useField('prevElectr', yup.number().required('Введите данные электро счетчика'))

  // Gas
  const {
    value: prevGas,
    errorMessage: prevGasError,
    handleBlur: prevGasBlur
  } = useField('prevGas', yup.number().required('Введите предыдущие показания'))

  // Water
  const {
    value: prevWater,
    errorMessage: prevWaterError,
    handleBlur: prevWaterBlur
  } = useField('prevWater', yup.number().required('Введите предыдущие показания'))

  // ---- ** ---- CURRENT DATA ---- ** ---- //
  // Electricity
  const {
    value: electr,
    errorMessage: electrError,
    handleBlur: electrBlur
  } = useField('electr', yup.number().required('Введите данные электро счетчика'))

  // Gas
  const {
    value: gas,
    errorMessage: gasError,
    handleBlur: gasBlur
  } = useField('gas', yup.number().required('Введите данные счетчика газа'))

  // Water
  const {
    value: water,
    errorMessage: waterError,
    handleBlur: waterBlur
  } = useField('water', yup.number().required('Введите данные счетчика воды'))

  // ---- ** ---- ** ---- ** ---- //
  // Description
  const { value: desc, errorMessage: descError, handleBlur: descBlur } = useField('desc')

  const onSubmit = handleSubmit(async ({ status, date, desc }) => {
    try {
      const dateNow = new Date()
      const dateHours = dateNow.getHours()
      const dateMinutes = dateNow.getMinutes()
      const dateSeconds = dateNow.getSeconds()
      const fullDate = `${date} ${dateHours}:${dateMinutes}:${dateSeconds}`

      const isInitial = isHasKeysObject(currInitial)
      const currValues = {
        electr: electr,
        gas: gas,
        water: water
      }
      const prevValues = {
        electr: prevElectr,
        gas: prevGas,
        water: prevWater
      }

      const { ...calcData } = useCalcCommunalData(currValues, prevValues, rates.value)

      const payload = {
        date: fullDate,
        status,
        desc,
        image: imageDownloadUrl.value,
        ...calcData
      }

      if (isInitial) {
        await store.dispatch('communal/update', {
          id: currInitial?.id,
          ...payload
        })
        emit('close')

        return
      }

      await store.dispatch('communal/add', {
        id: Date.now().toString(),
        ...payload
      })

      emit('close')
      resetForm()
      await store.dispatch('communal/load')
    } catch (e) {
      console.error(e.message)
    }
  })

  return {
    status,
    date,
    dError,
    dBlur,
    prevElectr,
    prevElectrError,
    prevElectrBlur,
    prevGas,
    prevGasError,
    prevGasBlur,
    prevWater,
    prevWaterError,
    prevWaterBlur,
    electr,
    electrError,
    electrBlur,
    gas,
    gasError,
    gasBlur,
    water,
    waterError,
    waterBlur,
    desc,
    descError,
    descBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    isSubmitting,
    onSubmit
  }
}
