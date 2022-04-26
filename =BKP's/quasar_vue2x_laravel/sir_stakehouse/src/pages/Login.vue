<template>
  <q-page
    class="bg-dark window-height window-width row justify-center items-center"
  >
    <div class="column flex flex-center">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">SIR.STAKEHOUSE</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form
              action="#"
              method="POST"
              @submit.prevent="AuthLogin()"
              class="q-gutter-md"
            >
              <q-input
                square
                filled
                clearable
                v-model="formLogin.email"
                type="email"
                label="Informe seu e-mail:"
                :rules="[(val) => !!val || 'E-mail obrigatório!']"
              />

              <q-input
                square
                filled
                clearable
                v-model="formLogin.password"
                type="password"
                label="Informe sua senha"
                :rules="[(val) => !!val || 'Senha obrigatória!']"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-blue-12"
              size="lg"
              class="full-width"
              label="ENTRAR"
              type="submit"
              @click="AuthLogin()"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none"> </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    token() {
      let token =
        "Bearer eyJpdiI6IlRHaVpPcXUvRXlxQ0laNXdZZENHRVE9PSIsInZhbHVlIjoiV3QzSXVLOFljWVNJdnpwS25UZkxrYXdKMllweGs5dnFMVkYySTZjcmxLVU1CNGc3eFNkUGExc2hiVUpkQkVhc0pGMVd2VVV5enU2em5NN1orTWVReUtWK2lpMFFKajJ1amk3U0R6cE04Qll5a0Y1c2hoamJtTVRVa0hiaFBocFUiLCJtYWMiOiI2OTk5ZjA1OTcwYTBjNzYwMmNkNjE5ZTdlNzUzYzJlYTE3MzI2NDhiYTdjYWQ3MDExYWMyYTE0MzI4ZDdmNjRkIiwidGFnIjoiIn0%3D";
      document.cookie.split(";");
      console.log(token);
      return token;
    },
  },

  name: "Login",
  data() {
    return {
      getBaseUrl: `http://localhost:8000/sanctum/csrf-cookie`,
      postBaseUrl: `http://localhost:8000/api/login`,
      getUsersUrl: `http://localhost:8000/api/users`,
      formLogin: {},
    };
  },

  methods: {
    refreshPage() {
      // Método que recarrega a página fazendo uma cópia diretamente do servidor
      setTimeout(function () {
        location.assign("administrador"); // Carrega um novo documento e mostra o dashboard
      }, 2300);
    },

    NotifySuccess() {
      // Método de mostrar mensagem de sucesso após o login
      this.$q.notify({
        message: "Login efetuado com sucesso!",
        color: "blue",
        position: "center",
        timeout: 2500,
      });
    },

    NotifyError() {
      // Método de mostrar mensagem de erro após o login inválido
      this.$q.notify({
        message: "Usuário ou senha inválidos!",
        type: "negative",
        position: "center",
        timeout: 2500,
      });
    },

    async AuthLogin() {
      let config = {
        headers: {
          Authorization: this.token,
        },
      };
      /* Promises .then, irá fazer as requisições via GET e POST do login do usuário,
       * e retornar as respostas, Caso contrário, fará o catch e finally para o tratamento de erros */

      await axios
        .get(this.getBaseUrl, this.formLogin, config)
        .then((response) => {
          console.log("MÉTODO VIA GET OK (GET CSRF-COOKIE)" + response);
        });

      await axios
        .get(this.getUsersUrl, this.formLogin, config)
        .then((response) => {
          console.log("MÉTODO VIA GET OK (GET USERS)" + response);
        });

      await axios
        .post(this.postBaseUrl, this.formLogin, config)
        .then((response) => {
          this.formLogin = response.data;
          this.NotifySuccess(); // Exibe a mensagem e recarrega a página
          this.refreshPage();
        })

        .catch((error) => {
          console.error("Usuário ou senha inválidos!" + error);
          this.NotifyError(); // Exibe a mensagem de erro
        })

        .finally((response) => {
          console.log(response);
        });
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
  font-weight: bold;
}
</style>
