import { ref } from 'vue'

export const checkboxes = ref([])

export const selectCheckboxes = checkboxIds => {
  checkboxes.value = checkboxIds
}

export const resetCheckboxes = () => {
  checkboxes.value.length = 0
}
