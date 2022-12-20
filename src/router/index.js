import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import store from '../store'

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
    path: '/project/:id',
    name: 'Project',
    component: () => import('../views/ProjectView.vue'),
    meta: {
      layout: 'main',
      auth: true,
      breadcrumb: true
    }
  },
  {
    path: '/users',
    name: 'UsersRoot',
    redirect: { name: 'Users' },
    component: () => import('../views/UsersRootView.vue'),
    meta: {
      breadcrumb: 'Пользователи',
      layout: 'main',
      auth: true
    },
    children: [
      {
        path: 'list',
        name: 'Users',
        component: () => import('../views/UsersView.vue'),
        meta: {
          breadcrumb: false
        }
      },
      {
        path: 'profile/:id',
        name: 'Profile',
        component: () => import('../views/ProfileView.vue')
      },
      {
        path: 'edit-profile/:id',
        name: 'EditProfile',
        component: () => import('../views/EditProfileView.vue')
      }
    ]
  },
  {
    path: '/communal',
    name: 'Communal',
    component: () => import('../views/CommunalView.vue'),
    meta: {
      layout: 'main',
      auth: true,
      breadcrumb: 'Оплата коммунальных'
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
