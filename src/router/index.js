import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import store from '../store'
import modules from './modules'
import { error } from '@/utils/error'

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
  const requireAdmin = to.meta.isAdmin
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (requireAdmin) {
    if (store.getters['users/isAdmin']) {
      return next()
    }

    store.dispatch('setMessage', {
      value: error('admin'),
      type: 'danger'
    })

    return next(from.fullPath || '/')
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
