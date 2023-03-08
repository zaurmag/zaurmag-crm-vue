import { computed } from 'vue'

export function useCalcCommunalData(curr, prev, rates) {
  const prevElectr = prev.electr?.current ?? prev.electr
  const prevGas = prev.gas?.current ?? prev.gas
  const prevWater = prev.water?.current ?? prev.water

  // Different
  const diffElectr = computed(() => (curr.electr === 0 ? 0 : curr.electr - prevElectr))
  const diffGas = computed(() => (curr.gas === 0 ? 0 : curr.gas - prevGas))
  const diffWater = computed(() => (curr.water === 0 ? 0 : curr.water - prevWater))

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
      prev: prevElectr,
      current: curr.electr,
      diff: diffElectr.value,
      rate: rates.value.electr,
      amount: amount.value.electr
    },
    gas: {
      prev: prevGas,
      current: curr.gas,
      diff: diffGas.value,
      rate: rates.value.gas,
      amount: amount.value.gas
    },
    water: {
      prev: prevWater,
      current: curr.water,
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
