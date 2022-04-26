export default [
  {
    mode: 'history',
    base: process.env.BASE_URL,
    path: '/serie/:id',
    name: 'show-serie',
    component: () => import(/* webpackChunkName: "show-serie" */ './ShowSerie')
  }
]
