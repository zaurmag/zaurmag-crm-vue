export const dbReplacerRoute = {
  path: '/db-replacer',
  name: 'DbReplacer',
  component: () => import('../views/DbReplacerView.vue'),
  meta: {
    layout: 'main',
    isAdmin: true,
    auth: true,
    nav: 'Замена БД',
    icon: 'database-up'
  }
}
