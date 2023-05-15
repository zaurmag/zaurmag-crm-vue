import { ref } from 'vue'

export const loader = ref(true)
export const toggleLoader = value => {
  loader.value = value
}
