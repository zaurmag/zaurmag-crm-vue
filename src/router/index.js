import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
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
      auth: true,
      breadcrumb ({ path }, label) {
        return {
          label,
          link: path
        }
      }
    }
  },
  {
    path: '/users',
    name: 'UsersRoot',
    redirect: { name: 'Users' },
    component: () => import('../views/UsersRoot.vue'),
    meta: {
      breadcrumb: 'Пользователи',
      layout: 'main',
      auth: true
    },
    children: [
      {
        path: 'list',
        name: 'Users',
        component: () => import('../views/Users.vue'),
        meta: {
          breadcrumb: false
        }
      },
      {
        path: 'profile/:id',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: {
          breadcrumb ({ path }, label) {
            return {
              label,
              link: path
            }
          }
        }
      },
      {
        path: 'edit-profile/:id',
        name: 'EditProfile',
        component: () => import('../views/EditProfile.vue'),
        meta: {
          breadcrumb (route, label) {
            console.log(label)
            return {
              label: `редактирование: ${label}`,
              link: route.path
            }
          }
        }
      }
    ]
  },
  {
    path: '/dbreplacer',
    name: 'dbreplacer',
    component: () => import('../views/DbReplacer'),
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
