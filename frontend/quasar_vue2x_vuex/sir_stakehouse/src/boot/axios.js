// Arquivo de configuração global do axios. Configuração base da API
import Vue from 'vue'
import axios from "axios";

axios.defaults.baseURL = `http://localhost:8000/sanctum/csrf-cookie`, // Cors liberado para o sanctum
axios.defaults.withCredentials = true,
//axios.defaults.PostLoginUrl = `http://localhost:8000/api/login`,
//axios.defaults.PostUsersUrl = `http://localhost:8000/api/users`,
//axios.defaults.PostRegisterUrl = `http://localhost:8000/api/register`,

Vue.prototype.$axios = axios
