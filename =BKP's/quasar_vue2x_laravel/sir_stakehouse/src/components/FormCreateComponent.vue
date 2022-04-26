<template>
  <div class="q-pa-md" style="max-width: 520px">

    <q-btn class="BtnRegister" icon="add" color="green" label="NOVO" @click="btnCreate = true" />

    <q-dialog v-model="btnCreate">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Preencha os dados abaixo:</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <!-- Form modal com o método CREATE() que irá cadastrar os dados -->
        <q-card-section>
          <div class="q-pa-md" style="max-width: 400px">
            <q-form @submit.prevent="create()" class="q-gutter-md">
              <q-input
                filled
                v-model="formCreate.name"
                label="Nome completo: *"
                :rules="[(val) => !!val || 'Nome obrigatório!']"
              />

              <q-input
                filled
                type="email"
                v-model="formCreate.email"
                label="Informe seu email: *"
                :rules="[(val) => !!val || 'E-mail obrigatório!']"
              />

              <q-input
                filled
                v-model="formCreate.phone"
                label="Celular/WhatsApp:"
                mask="(##) ##### - ####"
                unmasked-value
                :rules="[(val) => !!val || 'Celular obrigatório!']"
              />

              <q-input
                filled
                type="password"
                v-model="formCreate.password"
                label="Informe sua senha: *"
              />

              <div>
                <q-btn label="CADASTRAR" type="submit" color="primary" />
                <q-btn
                  label="LIMPAR"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
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
  data () {
    return {
      urlBaseList: `http://localhost:8000/api/funcionarios/`,
      funcs: {},
      config: {},
      formCreate: {},
      btnCreate: false,
    };
  },
  methods: {

    refreshPage() { // Método que recarrega a página fazendo uma cópia diretamente do servidor
    setTimeout(function () {
        location.reload(true)
    }, 2300);
},

    /**CREATE FUNCIONÁRIOS */
    async create() {
      this.btnCreate = true;

      /* Configuração de um objeto literal onde adiciona o token de autorização para requests,
      melhorando a segurança e evitar problemas de requisições ao backend. */
      let config = {
        headers: {
          Authorization: this.token,
        },
      };
      try {
        await axios.post(this.urlBaseList, this.formCreate, config);

        this.$q.notify({
          message: "Funcionário cadastrado com sucesso!",
          type: "positive",
        });
        this.refreshPage();

      } catch (error) {
        this.$q.notify({
          message: "Erro ao cadastrar funcionário!",
          type: "negative",
        });
        console.error("ERROR REQUEST API" + error.response);
      }
    },
  },
};
</script>
