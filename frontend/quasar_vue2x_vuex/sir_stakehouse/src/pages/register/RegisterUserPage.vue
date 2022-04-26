<template>
  <div class="bg-blue-10 window-height window-width row justify-center items-center">
    <div class="column flex flex-center">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">INFORME SEUS DADOS ABAIXO:</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form @submit="SubmitUser()" class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="users.name"
                type="name"
                label="Nome completo:"
                :rules="[(val) => !!val || 'Nome obrigatório']"
              />

              <q-input
                square
                filled
                clearable
                v-model="users.email"
                type="email"
                label="E-mail:"
                :rules="[(val) => !!val || 'E-mail obrigatório']"
              />
              <q-input
                square
                filled
                clearable
                v-model="users.password"
                type="password"
                label="Senha:"
                :rules="[(val) => !!val || 'Senha obrigatória']"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              class="BtnRegisterUser"
              unelevated
              color="light-blue-12"
              size="lg"
              label="CADASTRAR"
              @click="RegisterFormUser()"
              type="submit"
            />
          </q-card-actions>
          <q-card-section>
            <q-btn
              class="BtnBackLogin"
              label="VOLTAR"
              @click="BackLogin()"
              color="blue"
              flat
            />
          </q-card-section>
          <q-card-section class="text-center q-pa-none"> </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"; // Importando as actions do vuex

export default {
  name: "RegisterUserPage",
  data() {
    return {
      users: {},
    };
  },

  // Criando e chamando os métodos das actions do vuex
  methods: {
    ...mapActions("auth", ["RegisterUser"]),

    // Método de mostrar mensagem de sucesso após o cadastro
    NotifySuccess() {
      this.$q.notify({
        message: "Login efetuado com sucesso!",
        color: "blue",
        position: "center",
        timeout: 2400,
      });
    },

    SubmitUser() {
      this.RegisterUser(this.users);
      this.NotifySuccess();
    },

    BackLogin() {
      location.assign("/")
    },
  },
};
</script>

<style>
.q-card {
  width: 600px;
  font-weight: bold;
}
.BtnRegisterUser {
  width: 95%;
  margin: 0 0 0 1rem;
  align-items: center;
  justify-content: center;
}
.BtnBackLogin {
  margin: 1rem 0 0 0.4rem;
  font-size: larger;
  display: flex;
  width: 98%;
  align-items: center;
  justify-content: center;
}
</style>
