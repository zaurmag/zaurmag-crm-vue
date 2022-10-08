import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export function getUser () {
  const route = useRoute()
  const store = useStore()

  onMounted(async () => {
    await store.dispatch('users/load')
  })

  return computed(() => store.getters['users/userById'](route.params.id))
}
