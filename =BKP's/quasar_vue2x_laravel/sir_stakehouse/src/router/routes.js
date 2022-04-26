
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/administrador',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/administrador', name: 'Index', meta: {requireAuth: true}, component: () => import('pages/Index.vue') },
      { path: '/perfil', name: 'Profile', component: () => import('pages/Profile.vue') },
      { path: '/pedidos', name: 'Orders', component: () => import('pages/Orders.vue') },
      { path: '/produtos', name: 'Products', component: () => import('pages/Products.vue') },
      { path: '/relatorios', name: 'Reports', component: () => import('pages/Reports.vue') },
      { path: '/funcionarios', name: 'RegisterPage', component: () => import('pages/RegisterPage.vue') },
      { path: '/configuracoes', name: 'Config', component: () => import('pages/Config.vue') },
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
