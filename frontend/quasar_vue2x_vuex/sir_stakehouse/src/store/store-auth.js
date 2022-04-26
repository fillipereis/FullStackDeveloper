/* Store global de usuários. Aqui se define e faz a lógica do vuex
declarando as operações e métodos: register, login, logout...  */

// Importando as configurações e métodos do axios da aplicação global
import axios from "axios";

// Declarado os states (objetos)
const state = {
  users: {},
  token: {},
  isAuthenticated: false, // Usuário booleano inicial como falso
};

// Mutations que serão alterados do usuário e token de autorização
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERS(state, user) {
    state.isAuthenticated = user;
  },
};

const actions = {
  // Método onde configura o token, definindo o headers authorization no navegador
  async ConfigToken({ commit }, token) {
    commit("SET_TOKEN", token);

    try {
      let response = await axios.get(axios.defaults.baseURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
      //commit("SET_USERS", response.data);
    } catch (error) {
      console.log(error);
    }
  },

  // Métodos de registro e login do usuário, enviando ao backend
  RegisterUser({}, payload) {
    axios
      .post(`http://localhost:8000/api/register`, payload, this.users)
      .then((response) => {
        console.log("POST REGISTER URL OK :)" + response);
      })
      .catch((error) => {
        console.log("Erro ao cadastrar usuário!" + error);
      })
      .finally((response) => {
        console.log(response);
      });
  },

  async LoginUser({ dispatch, state, commit }, payload) {
    await axios
      .post(`http://localhost:8000/api/login`, payload, this.users, this.token)
      .then((response) => {
        dispatch("ConfigToken", response.data.token); // Chamando o método e retornando o token
        console.log("POST LOGIN SUCCESS :)" + state);
        alert("USUÁRIO LOGADO COM SUCESSO!");
        commit("SET_USERS", true);  // Commit do método, alteando o estado do usuário autenticado
        this.$router.push({ path: "/administrador" }); // Redirecionando ao dashboard
      })
      .catch((error) => {
        console.log("ERROR!" + error);
        alert("E-MAIL OU SENHA INVÁLIDOS!");
      })
      .finally((response) => {
        console.log(response);
      });
  },
};

// Retornando os getters do módulo de autenticação e usuários
const getters = {
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  users(state) {
    return state.users;
  },
};

export default {
  namespaced: true, // Prefixo que força com o que o módulo auth seja = true
  state,
  mutations,
  actions,
  getters,
};
