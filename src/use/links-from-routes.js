import routes from '../router/modules'

export const useLinksFromRoutes = () => {
  return routes.map(route => {
    return {
      path: route.path,
      name: route.redirect.name,
      title: route.meta.nav,
      icon: route.meta.icon
    }
  })
}
