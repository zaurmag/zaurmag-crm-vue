import { computed } from 'vue'

export function useCalcCommunalData(e, g, w, prevData, rates) {
  // Different
  const diffElectr = computed(() => {
    const prev = prevData.value?.electr?.current || 0

    return e === 0 ? 0 : e - prev
  })

  const diffGas = computed(() => {
    const prev = prevData.value?.gas?.current || 0

    return g === 0 ? 0 : g - prev
  })

  const diffWater = computed(() => {
    const prev = prevData.value?.water?.current || 0

    return w === 0 ? 0 : w - prev
  })

  // Calculate
  const amount = computed(() => {
    const electr = diffElectr.value * rates.value.electr
    const gas = diffGas.value * rates.value.gas
    const water = diffWater.value * rates.value.water
    const trash = rates.value.people * rates.value.trash
    const total = electr + gas + water + trash + rates.value.maintanceGe

    return {
      electr,
      gas,
      water,
      trash,
      total
    }
  })

  return {
    electr: {
      prev: prevData.value?.electr.prev,
      current: e,
      diff: diffElectr.value,
      rate: rates.value.electr,
      amount: amount.value.electr
    },
    gas: {
      prev: prevData.value?.gas.prev,
      current: g,
      diff: diffGas.value,
      rate: rates.value.gas,
      amount: amount.value.gas
    },
    water: {
      prev: prevData.value?.water.prev,
      current: w,
      diff: diffWater.value,
      rate: rates.value.water,
      amount: amount.value.water
    },
    trash: {
      people: rates.value.people,
      rate: rates.value.trash,
      amount: amount.value.trash
    },
    maintanceGe: rates.value.maintanceGe,
    amount: amount.value.total
  }
}
