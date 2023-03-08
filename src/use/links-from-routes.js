import routes from '../router/modules'
import { useStore } from 'vuex'

export const useLinksFromRoutes = () => {
  const store = useStore()
  const isAdmin = store.getters['users/isAdmin']

  if (!isAdmin) {
    const index = routes.findIndex(route => route.meta.isAdmin)
    routes.splice(-1, index)
  }

  return routes.map(route => {
    const name = route?.redirect?.name || route?.name

    return {
      path: route.path,
      name,
      title: route.meta.nav,
      icon: route.meta.icon
    }
  })
}
