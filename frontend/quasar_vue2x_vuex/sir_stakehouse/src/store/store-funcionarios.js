// Store global da aplicação de pedidos. Aqui se define e faz a lógica do vuex

// Declarado os states (objetos)
const state = {
  funcionarios: {
    ID1: {
      name: "Fillipe Carvalho dos Reis",
      completed: false,
    },
    ID2: {
      name: "João Pedro",
      completed: false,
    },
    ID3: {
      name: "Helena Lúcia",
      completed: false,
    },
  },
};

const mutations = {};

const actions = {};

const getters = {
  funcionarios: (state) => {
    return state.funcionarios;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
