export default [
  {
    mode: 'history',
    base: process.env.BASE_URL,
    name: 'watchedlist',
    path: '/watchedlist',
    component: () =>
      import(/* webpackChunkName: "watchedlist" */ './Watchedlist'),
    meta: {
      showNavbar: true,
      title: 'Watchedlist',
      icon: 'playlist_add_check',
      label: 'Já assisti'
    }
  }
]
