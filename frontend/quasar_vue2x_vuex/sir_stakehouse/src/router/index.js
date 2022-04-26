// Rotas globais de toda a aplicação e a lógica do beforeEach
// OBS: CONFIGURAR DEPOIS O VUEX PERSIST PARA JÁ CRIAR A ROTA AUTOMATICAMENTE QUANDO CRIAR A PAGE

import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const router = new Router({
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  store,

  routes: [
    {
      path: "/",
      component: () => import("src/layouts/LoginLayout.vue"),
      meta: { guest: true }, // Meta definido como true para o layout login
      children: [
        { path: "/", component: () => import("src/pages/LoginPage.vue") },
      ],
    },

    {
      path: "/criar-conta",
      name: "RegisterUserPage",
      component: () => import("src/pages/register/RegisterUserPage.vue"),
    },

    // Rotas configuradas após o usuário ser validado e autenticado
    {
      path: "/administrador",
      component: () => import("src/layouts/MainLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "/administrador",
          component: () => import("src/pages/DashboardPage.vue"),
        },
        {
          path: "/pedidos",
          name: "OrdersPage",
          component: () => import("src/pages/OrdersPage.vue"),
        },
        {
          path: "/funcionarios",
          name: "FuncionariosPage",
          component: () => import("src/pages/FuncionariosPage.vue"),
        },
        {
          path: "/relatorios",
          name: "ReportsPage",
          component: () => import("src/pages/ReportsPage.vue"),
        },
        {
          path: "/configuracoes",
          name: "PageSettings",
          component: () => import("src/pages/PageSettings.vue"),
        },
      ],
    },
    {
      path: "*",
      component: () => import("src/pages/Error404.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store().getters["auth/isAuthenticated"]) {
      next();
      return;
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
