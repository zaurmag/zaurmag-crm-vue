import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import store from '../store'
import modules from './modules'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      breadcrumb: 'Главная',
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/sign-in',
    name: 'Auth',
    component: () => import('../views/AuthView.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: () => import('../views/RegView.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/dbreplacer',
    name: 'dbreplacer',
    component: () => import('../views/DbReplacerView.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})

modules.forEach(module => {
  router.addRoute(module)
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const requireAdmin = to.meta.admin
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (requireAdmin) {
    if (store.getters['auth/isAdmin']) {
      return next()
    }

    return next('/sign-in?message=admin')
  }

  if (requireAuth) {
    if (isAuthenticated) {
      return next()
    }
    next('/sign-in?message=auth')
  }

  next()
})

export default router
