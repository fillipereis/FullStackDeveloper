export default [
  {
    mode: 'history',
    base: process.env.BASE_URL,
    name: 'series',
    path: '/series',
    component: () => import('./Series'),
    meta: {
      showNavbar: true,
      title: 'Séries',
      icon: 'dvr',
      label: 'Todas as séries'
    }
  }
]
