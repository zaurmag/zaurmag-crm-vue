import { reactive } from 'vue'
import router from '@/router'

/*
* Инструкция
* https://libraries.io/npm/vue-3-breadcrumbs
* */

const replaceSplit = (str) => {
  return str.replace(/\/$/, '').split('/')
}

class Breadcrumbs {
  constructor (router) {
    this.router = router
    this.name = null
    this.routes = reactive([]) // breadcrumbs array
    this.init()
  }

  init () {
    this.router.afterEach((route, from, failure) => {
      if (failure || (route.path === from.path && from.matched.length)) return false
      this.setBreadcrumbsByRoute(route)
    })
  }

  // Creates and sets breadcrumbs chain for route
  setBreadcrumbsByRoute (route) {
    if (!route) return false
    let arPath = replaceSplit(route.path)
    if (route.meta.breadcrumb === false) {
      arPath = [...replaceSplit(route.matched[0].path)]
    }
    let iterablePath = ''
    let spliced = false

    arPath.forEach((item, i) => {
      // 1. Get path for crumb
      iterablePath += (i === 1) ? item : '/' + item
      const isCurrentCrumb = i + 1 >= arPath.length

      // 2. Check if this crumb already exist, delete excess crumbs
      if (this.routes[i]?._path === iterablePath) {
        // if this is last crumb delete excess existing crumbs
        if (isCurrentCrumb) this.routes.splice(i + 1, this.routes.length)
        this.routes[i].current = i + 1 >= arPath.length
        return false
      } else if (!spliced && i < this.routes.length) {
        this.routes.splice(i, this.routes.length)
        spliced = true
      }

      // 3. Create and add crumb
      const breadcrumb = this.createBreadcrumb(iterablePath, isCurrentCrumb)
      if (!breadcrumb) return false

      this.routes.push(breadcrumb)
    })
  }

  setCurrentBreadcrumbName (name) {
    const current = this.routes.find(r => r.current)
    if (current) {
      current.label = name
    }
  }

  // Resolves route meta by path and creates breadcrumb object
  createBreadcrumb (path, isCurrent = false) {
    if (!path) return false
    const crumbRoute = this.router.resolve(path)
    const breadcrumb = crumbRoute.meta?.breadcrumb

    if (!breadcrumb) {
      return false
    }

    return {
      label: breadcrumb,
      link: crumbRoute.path,
      current: isCurrent,
      _path: path
    }
  }
}

const breadcrumbs = new Breadcrumbs(router)

export default breadcrumbs
