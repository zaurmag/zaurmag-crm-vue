import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import breadcrumbs from '@/use/breadcrumb'

export function getUser () {
  const route = useRoute()
  const store = useStore()
  const user = ref(null)

  onMounted(async () => {
    await store.dispatch('users/load')
    user.value = await store.getters['users/userById'](route.params.id) || {}
    const userName = route.name === 'EditProfile' ? 'редактирование: ' + user.value.name : user.value.name
    breadcrumbs.setCurrentBreadcrumbName(userName)
  })

  breadcrumbs.setCurrentBreadcrumbName('')

  return user
}
