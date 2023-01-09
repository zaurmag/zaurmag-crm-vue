import { computed } from 'vue'

export function useCalcCommunalData(electr, gas, water, prevData = {}, rates) {
	const prevElectr = computed(() => prevData.value?.electr?.current ?? 0)
	const prevGas = computed(() => prevData.value?.gas?.current ?? 0)
	const prevWater = computed(() => prevData.value?.water?.current ?? 0)

	// Different
	const diffElectr = computed(() => {
		if (electr === 0) {
			return 0
		}

		return electr - prevElectr.value
	})

	const diffGas = computed(() => {
		if (gas === 0) {
			return 0
		}

		return gas - prevGas.value
	})

	const diffWater = computed(() => {
		if (water === 0) {
			return 0
		}

		return water - prevWater.value
	})

	// Calculate
	const electrAmount = computed(() => diffElectr.value * rates.value.electr)
	const gasAmount = computed(() => diffGas.value * rates.value.gas)
	const waterAmount = computed(() => diffWater.value * rates.value.water)
	const trash = computed(() => rates.value.people * rates.value.trash)
	const amount = computed(() => {
		return (
			electrAmount.value +
			gasAmount.value +
			waterAmount.value +
			trash.value +
			rates.value.maintanceGe
		)
	})

	return {
		electr: {
			prev: prevElectr.value,
			current: electr,
			diff: diffElectr.value,
			rate: rates.value.electr,
			amount: electrAmount.value,
		},
		gas: {
			prev: prevGas.value,
			current: gas,
			diff: diffGas.value,
			rate: rates.value.gas,
			amount: gasAmount.value,
		},
		water: {
			prev: prevWater.value,
			current: water,
			diff: diffWater.value,
			rate: rates.value.water,
			amount: waterAmount.value,
		},
		trash: {
			people: rates.value.people,
			rate: rates.value.trash,
			amount: trash.value,
		},
		maintanceGe: rates.value.maintanceGe,
		amount: amount.value,
	}
}
