<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">

        </q-toolbar-title>

        <!-- Mostra o botão SAIR no dashboard -->
        <q-btn
          @click="logout()"
          flat
          icon-right="account_circle"
          label="SAIR"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header> MENU DE ACESSO </q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
      <!-- View para renderizar o dashboard -->
    </q-page-container>
  </q-layout>
</template>

<script>

export default {

  name: "MainLayout",
  data() {
    return {
      users: {},
      leftDrawerOpen: false,
      navs: [
        {
          label: "DASHBOARD",
          icon: "report",
          to: "/administrador",
        },
        {
          label: "PEDIDOS",
          icon: "shop",
          to: "/pedidos",
        },
        {
          label: "RELATÓRIOS",
          icon: "list",
          to: "/relatorios",
        },
        {
          label: "FUNCIONÁRIOS",
          icon: "add",
          to: "/funcionarios",
        },
        {
          label: "CONFIGURAÇÕES",
          icon: "settings",
          to: "/configuracoes",
        },
      ],
    };
  },
}
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
}
</style>
