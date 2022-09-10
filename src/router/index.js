import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/sign-in',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/sign-up',
    name: 'Register',
    component: () => import('../views/Reg.vue'),
    meta: {
      layout: 'empty'
    }
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: () => import('../views/Project.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      layout: 'main',
      auth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const requireAdmin = to.meta.admin
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (requireAdmin) {
    if (store.getters['auth/isAdmin']) {
      return next()
    } else {
      return next('/sign-in?message=admin')
    }
  }

  if (requireAuth) {
    if (isAuthenticated) {
      return next()
    } else {
      next('/sign-in?message=auth')
    }
  }

  next()
})

export default router
