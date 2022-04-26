<template>
  <div>
    <!-- Div pai para eliminar erros eslint -->
    <div class="q-pa-md" style="max-width: 350px">
      <div>
        <h5 id="TitleMsg">{{ msg }}</h5>
      </div>

      <div class="window-width row justify-center">
        <div style="margin: 0 8.5rem 0 0">
          <q-input
            v-model="search"
            placeholder="Pesquisar..."
            debounce="500"
            size="60"
            filled
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
      <TableFuncionarioComponent />
      <FormCreateComponent />
  </div>
</template>

<script>
import TableFuncionarioComponent from "../components/TableFuncionarioComponent.vue";
import FormCreateComponent from "../components/FormCreateComponent.vue";

export default {
  name: "RegisterPage",

  components: {
    TableFuncionarioComponent,
    FormCreateComponent
  },

  data() {
    return {
      msg: "FUNCIONÁRIOS",
      search: "",
    };
  },
}
</script>
