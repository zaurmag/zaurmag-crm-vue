import routesModules from '../router/modules'
import { useStore } from 'vuex'

export const useLinksFromRoutes = () => {
  const store = useStore()
  const isAdmin = store.getters['users/isAdmin']
  let routes = [...routesModules]

  if (!isAdmin) {
    routes = routes.filter(route => {
      const isChildHasAdmin = route?.children?.some(childRoute => childRoute?.meta?.isAdmin)

      return !route.meta?.isAdmin && !isChildHasAdmin
    })
  }

  return routes.map(route => {
    const name = route?.redirect?.name || route?.name

    return {
      name,
      path: route.path,
      title: route.meta.nav,
      icon: route.meta.icon
    }
  })
}
