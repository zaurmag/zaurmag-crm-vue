export const financeRoute = {
  path: '/finance',
  name: 'FinanceRoot',
  redirect: { name: 'Finance' },
  component: () => import('../../../views/RootView.vue'),
  meta: {
    auth: true,
    layout: 'main',
    nav: 'Финансы',
    icon: 'wallet2',
    breadcrumb: 'Финансы'
  },
  children: [
    {
      path: 'list',
      name: 'Finance',
      component: () => import('../views/FinanceView.vue'),
      meta: {
        breadcrumb: false
      }
    },
    {
      path: 'page/:id',
      name: 'FinancePage',
      component: () => import('../views/FinancePageView.vue')
    }
  ]
}
