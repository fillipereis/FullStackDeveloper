export default [
  {
    mode: 'history',
    base: process.env.BASE_URL,
    path: '/',
    name: 'home',
    component: () => import('./Home')
  }
]
