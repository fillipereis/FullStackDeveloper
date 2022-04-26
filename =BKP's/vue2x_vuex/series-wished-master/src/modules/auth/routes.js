export default [
  {
    mode: 'history',
    base: process.env.BASE_URL,
    name: 'login',
    path: '/login',
    component: () => import('./pages/Login')
  }
]
