export const communalRoute = {
  path: '/communal',
  name: 'CommunalRoot',
  redirect: { name: 'Communal' },
  component: () => import('../../../views/RootView.vue'),
  meta: {
    layout: 'main',
    auth: true,
    breadcrumb: 'Оплата коммунальных',
    nav: 'Платежи ЖКХ',
    icon: 'house'
  },
  children: [
    {
      path: 'list',
      name: 'Communal',
      component: () => import('../views/CommunalView.vue'),
      meta: {
        breadcrumb: false
      }
    },
    {
      path: 'page/:id',
      name: 'CommunalPage',
      component: () => import('../views/CommunalPageView.vue')
    }
  ]
}
