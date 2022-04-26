<template>
  <!--
    eslint-disable vue/no-v-model-argument
   -->
  <div class="q-pa-md">
    <!-- Mostrando a cor azul ao selecionar o checkbox da table -->
    <q-table
      color="blue"
      :data="funcs"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props" v-if="props.col.label == 'AÇÕES'">
          <q-btn @click="openUpdateDialog(props)" icon="edit" color="blue">
          </q-btn>
          <q-btn @click="openDeleteDialog(props)" icon="delete" color="red">
          </q-btn>
        </q-td>
        <q-td v-else :props="props">
          {{ props.value }}
        </q-td>
      </template>
    </q-table>
    <div class="q-mt-md">
      <q-btn
        class="BtnDeleteAll"
        icon="delete"
        color="red"
        label="Excluir todos"
        @click="openDeleteAllDialog()"
      />
    </div>

    <!--Form modal para retornar e logo após atualizar os dados em methods -->
    <q-dialog v-model="btnUpdate">
      <q-card>
        <q-card-section class="row items-center q-gutter-xl">
          <div class="text-h6">Preencha os dados abaixo:</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <!-- Form modal com o método UPDATE(rows) que irá atualizar os dados -->
        <q-card-section>
          <div class="q-pa-md" style="max-width: 400px">
            <q-form class="q-gutter-xl">
              <q-input
                filled
                v-model="formUpdate.id"
                readonly
                label="Código do funcionário:"
              />
              <q-input
                filled
                v-model="formUpdate.name"
                label="Nome completo: *"
                :rules="[(val) => !!val || 'Nome obrigatório!']"
              />

              <q-input
                filled
                type="email"
                v-model="formUpdate.email"
                label="Informe seu email: *"
                :rules="[(val) => !!val || 'E-mail obrigatório!']"
              />

              <q-input
                filled
                v-model="formUpdate.phone"
                label="Celular/WhatsApp:"
                mask="(##) ##### - ####"
                unmasked-value
                :rules="[(val) => !!val || 'Celular obrigatório!']"
              />

              <q-input
                filled
                type="password"
                v-model="formUpdate.password"
                label="Informe sua senha: *"
                :rules="[(val) => !!val || 'Senha obrigatória!']"
              />

              <q-btn label="ATUALIZAR" @click="update()" color="primary" />
              <q-btn
                label="LIMPAR"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="btnDelete">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            Deseja realmente excluir o funcionário?
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
          <q-space />
        </q-card-section>

        <!-- Form modal com o método DELETE(rows) que irá excluir os dados -->
        <q-card-section>
          <div class="q-pa-md" style="max-width: 400px">
            <q-btn label="SIM" type="submit" color="red" @click="Delete()" />
            <q-btn
              label="NÃO"
              type="exit"
              color="primary"
              flat
              round
              dense
              v-close-popup
              class="q-ml-sm"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="btnDeleteAll">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            Deseja excluir todos os funcionários?
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
          <q-space />
        </q-card-section>

        <!-- Form modal que abrir e irá excluir todos dados -->
        <q-card-section>
          <div class="q-pa-md" style="max-width: 400px">
            <q-btn
              label="SIM"
              type="submit"
              color="red"
              @click="DeleteAll(selected)"
            />
            <q-btn
              label="NÃO"
              type="exit"
              color="primary"
              flat
              round
              dense
              v-close-popup
              class="q-ml-sm"
            />
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

  data() {
    return {
      config: {},
      urlBaseList: `http://localhost:8000/api/funcionarios/`,
      urlBaseUpdate: `http://localhost:8000/api/update`,
      urlBaseDelete: `http://localhost:8000/api/Delete`,
      urlBaseDeleteAll: `http://localhost:8000/api/DeleteAll`,
      selected: [],
      funcs: [],
      formUpdate: {},
      formDelete: {},
      formDeleteAll: [],
      btnUpdate: false,
      btnDelete: false,
      btnDeleteAll: false,
      color: ["blue"],
      columns: [
        {
          name: "name",
          label: "NOME COMPLETO",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true, // Ordenar em ordem crescente ou decrescente,
        },
        {
          name: "email",
          label: "E-MAIL",
          align: "center",
          field: (row) => row.email,
          format: (val) => `${val}`,
          field: "email",
          sortable: true,
        },
        {
          name: "phone",
          label: "TELEFONE",
          align: "center",
          field: (row) => row.phone,
          format: (val) => `${val}`,
          field: "phone",
          sortable: true,
        },
        {
          name: "actions",
          label: "AÇÕES",
          field: "actions",
          align: "center",
        },
      ],
    };
  },

  mounted() {
    this.getFuncs(); // Após o componente ser montado, irá retornar a lista dos funcionários na tabela
  },

  methods: {
    refreshPage() {
      // Método que recarrega a página fazendo uma cópia diretamente do servidor
      setTimeout(function () {
        location.reload(true);
      }, 2300);
    },

    async getFuncs() {
      try {
        let config = {
          headers: { Authorization: this.token },
        };

        let response = await axios.get(this.urlBaseList, this.funcs, config);

        if (response.status === 200) {
          this.funcs = response.data;
        } else {
          console.log("ERRO REQUEST API!" + response);
        }
      } catch (error) {
        axios.get(this.urlBaseList);

        this.$q.notify({
          message: "Erro de conexão ao banco de dados!",
          type: "negative",
          position: "center",
          timeout: 2500,
        });
        console.error("ERRO REQUEST API" + error.response);
      }
    },
    // Método que executa o form modal update
    openUpdateDialog(props) {
      // Faz com o que o bind não mostre em tempo real ao digitar os dados no form
      this.formUpdate = Object.assign({}, props.row);
      this.btnUpdate = true;
    },

    // Método que executa o form modal delete
    openDeleteDialog(props) {
      this.formDelete = Object.assign({}, props.row);
      this.btnDelete = true;
    },

    // Método que executa o form modal delete
    openDeleteAllDialog() {
      this.btnDeleteAll = true;
    },

    /**UPDATE FUNCIONÁRIOS */
    async update() {
      try {
        // Configuração de um objeto literal onde adiciona o token de autorização para requests
        let config = {
          headers: { Authorization: this.token },
        };
        await axios.put(
          `${this.urlBaseUpdate}/${this.formUpdate.id}`,
          this.formUpdate,
          config
        );

        this.$q.notify({
          message: "funcionário atualizado com sucesso!",
          color: "blue",
          timeout: 2500,
        });
        this.getFuncs(); // Atualiza a página mostrando o funcionário atualizado
      } catch (error) {
        axios.delete(
          `${this.urlBaseUpdate}/${this.formUpdate.id}`,
          this.formUpdate,
          config
        );

        this.$q.notify({
          message: "Erro ao atualizar funcionário!",
          type: "negative",
          timeout: 2500,
        });
      }
    },
    async Delete() {
      // Método de excluir 1 funcionário por vez
      try {
        let config = {
          headers: { Authorization: this.token },
        };

        await axios.delete(
          `${this.urlBaseDelete}/${this.formDelete.id}`,
          this.formDelete,
          config
        );
        this.$q.notify({
          message: "Funcionário excluído com sucesso!",
          type: "positive",
          timeout: 2500,
        });
        this.getFuncs(); // Retornando a lista
        this.refreshPage(); // Atualizando a página
      } catch (error) {
        await axios.delete(
          `${this.urlBaseDelete}/${this.formDelete.id}`,
          this.formDelete,
          config
        );

        this.$q.notify({
          message: "Erro ao excluir funcionário!",
          type: "negative",
          timeout: 2500,
        });
      }
    },

    async DeleteAll(selectedFunc) {
      // Método de excluir 1 funcionário por vez

      // Selecionando 1 ou mais funcionários para exclusão
      const selectedIDs = selectedFunc.map((funcionario) => funcionario.id);
      this.$q.loading.show(); // Mostrar carregamento na página

      try {
        let config = {
          headers: { Authorization: this.token },
        };

        await axios.delete(
          `${this.urlBaseDeleteAll}`,
          { data: selectedIDs },
          config
        );
        this.$q.loading.hide(); // Mostrar processo de loading na tela

        this.$q.notify({
          message: "Funcionários selecionados excluídos com sucesso!",
          type: "positive",
          timeout: 2500,
        });
        this.getFuncs(); // Retornando a lista
        this.refreshPage(); // Atualizando a página
      } catch (error) {
        await axios.delete(
          `${this.urlBaseDeleteAll}`,
          { data: selectedIDs },
          config
        );
        this.$q.notify({
          message: "Erro ao excluir os funcionários!",
          type: "negative",
          timeout: 2500,
        });
      }
    },

    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} funcionário${
            this.selected.length > 1 ? "s" : ""
          } selecionado de ${this.funcs.length}`;
    },
  },
};
</script>
