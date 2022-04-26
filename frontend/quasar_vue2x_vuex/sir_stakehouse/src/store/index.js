// Importando os stores globais da aplicação vuex

import Vue from "vue";
import Vuex from "vuex";
import auth from "./store-auth";
import pedidos from "./store-pedidos";
import funcionarios from "./store-funcionarios";

Vue.use(Vuex);

export default function () {
  const Store = new Vuex.Store({
    modules: {
      pedidos,
      funcionarios,
      auth,
    },
    strict: process.env.DEBUGGING,
  });

  return Store;
}
