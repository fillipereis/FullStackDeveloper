<template>
  <q-page
    class="bg-blue-10 window-height window-width row justify-center items-center"
  >
    <div class="column">
      <div class="row">
        <h5
          style="margin: 10px auto"
          class="text-h5 text-white text-center q-my-md"
        >
          SIR.STAKEHOUSE
        </h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <form
              @submit.prevent="SubmitLogin()"
              method="POST"
              class="q-gutter-md"
            >
              <q-input
                filled
                v-model="users.email"
                type="email"
                ref="email"
                input-class="text-left"
                label-slot
                clearable
              >
                <template v-slot:label>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="24px"
                      name="mail"
                    ></q-icon>
                    E-mail:
                  </div>
                </template>
              </q-input>
              <q-input
                filled
                v-model="users.password"
                type="password"
                ref="password"
                input-class="text-left"
                label-slot
                lazy-rules
                clearable
              >
                <template v-slot:label>
                  <div class="row items-center all-pointer-events">
                    <q-icon
                      class="q-mr-xs"
                      color="blue-8"
                      size="24px"
                      name="key"
                    ></q-icon>
                    Senha:
                  </div>
                </template></q-input
              >
              <q-btn
                class="BtnLogin"
                color="light-blue-12"
                size="lg"
                label="ENTRAR"
                type="submit"
              />
            </form>

            <q-btn
              class="BtnFormRegister"
              flat
              color="blue"
              label="CRIAR CONTA"
              @click="FormUser()"
              type="submit"
            />
          </q-card-section>
        </q-card>
      </div>
      <p class="text-white text-center q-mt-lg">
        TODOS OS DIREITOS RESERVADOS.
      </p>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";

export default {
  // Irá computar o método token onde declara o Bearer e retornando no console do navegador

  data() {
    return {
      users: {},
    };
  },
  methods: {
    ...mapActions("auth", ["LoginUser"]),

    // Métodos de mensagens de erro e sucesso após tentiva de login do usuário
    NotifyError() {
      // Método de mostrar mensagem de erro após o login inválido
      this.$q.notify({
        message: "Usuário ou senha inválidos!",
        color: "red",
        position: "center",
        timeout: 2500,
      });
    },
    NotifySuccess() {
      // Método de mostrar mensagem de erro após o login inválido
      this.$q.notify({
        message: "Usuário logado com sucesso!",
        color: "green",
        position: "center",
        timeout: 2500,
      });
    },

    SubmitLogin() {
        this.LoginUser(this.users);
      },

      FormUser() {
      location.assign("/criar-conta"); // Redirecionando para criar conta do usuário
    },
  },
};
</script>

<style>
.q-card {
  width: 450px;
  height: 370px;
  font-weight: bold;
}

.BtnLogin {
  width: 95%;
  margin: 2em 0 0 1rem;
  align-items: center;
  justify-content: center;
}

.BtnFormRegister {
  margin: 1rem 0 0 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
</style>
