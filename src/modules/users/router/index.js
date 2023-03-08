export const usersRoute = {
  path: '/users',
  name: 'UsersRoot',
  redirect: { name: 'Users' },
  component: () => import('../../../views/RootView.vue'),
  meta: {
    breadcrumb: 'Пользователи',
    layout: 'main',
    auth: true,
    nav: 'Пользователи',
    icon: 'people'
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
      path: 'user/:id',
      name: 'UsersPage',
      component: () => import('../views/UsersPageView.vue')
    },
    {
      path: 'user-edit/:id',
      name: 'UsersEditPage',
      component: () => import('../views/UsersEditPageView.vue')
    }
  ]
}
