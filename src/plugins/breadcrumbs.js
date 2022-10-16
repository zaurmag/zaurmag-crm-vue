/*
* Инструкция
* https://libraries.io/npm/vue-3-breadcrumbs
* */

import { reactive } from 'vue'

const replaceSplit = (str) => {
  return str.replace(/\/$/, '').split('/')
}

class Breadcrumbs {
  constructor (vueApp) {
    this.vueApp = vueApp
    this.router = vueApp.config.globalProperties.$router
    this.value = reactive([]) // breadcrumbs array
  }

  init () {
    this.router.afterEach((route, from, failure) => {
      if (failure || (route.path === from.path && from.matched.length)) return false
      this.setBreadcrumbsByRoute(route)
    })
  }

  // Creates and sets breadcrumbs chain for route
  setBreadcrumbsByRoute (route, name) {
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
      if (this.value[i]?._path === iterablePath) {
        // if this is last crumb delete excess existing crumbs
        if (isCurrentCrumb) this.value.splice(i + 1, this.value.length)
        this.value[i].current = i + 1 >= arPath.length
        return false
      } else if (!spliced && i < this.value.length) {
        this.value.splice(i, this.value.length)
        spliced = true
      }

      // 3. Create and add crumb
      const breadcrumb = this.createBreadcrumb(iterablePath, isCurrentCrumb, name)
      if (!breadcrumb) return false

      this.value.push(breadcrumb)
    })
  }

  // Resolves route meta by path and creates breadcrumb object
  createBreadcrumb (path, isCurrent = false, name) {
    if (!path) return false
    const crumbRoute = this.router.resolve(path)
    let breadcrumb = crumbRoute.meta?.breadcrumb
    if (typeof breadcrumb === 'function') {
      breadcrumb = breadcrumb(crumbRoute, this.vueApp, name)
    }

    if (!breadcrumb) {
      return false
    }

    const isBcObject = typeof breadcrumb === 'object'

    return {
      label: isBcObject ? breadcrumb.label : breadcrumb,
      link: (isBcObject && breadcrumb.link) ? breadcrumb.link : crumbRoute.path,
      current: isCurrent,
      _path: path
    }
  }
}

const breadcrumbs = {
  install: (app) => {
    app.config.globalProperties.$breadcrumbs = new Breadcrumbs(app)
    app.config.globalProperties.$breadcrumbs.init()
    app.provide('breadcrumbs', app.config.globalProperties.$breadcrumbs)
  }
}

export { breadcrumbs as default }
