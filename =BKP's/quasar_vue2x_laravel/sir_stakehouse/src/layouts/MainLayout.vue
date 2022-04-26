<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
      integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    

    <q-layout>
      <q-page-container>
        <router-view /><!--Mostra todo o dashboard do sistema-->
      </q-page-container>

      <q-header elevated class="bg-dark">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title></q-toolbar-title>
          <q-btn-dropdown stretch flat label="Sir.Stakehouse">
            <q-list>
              <q-item clickable @click="$router.push({ name: 'Profile' })">
                <q-item-section avatar>
                  <q-avatar size="56px" class="q-mb-sm">
                    <q-img src="#"></q-img>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>EDITAR PERFIL</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="edit" />
                </q-item-section>
              </q-item>

              <q-item clickable @click="openLogout = true">
                <q-item-section avatar>
                  <q-avatar size="56px" class="q-mb-sm">
                    <q-img src="#"></q-img>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>SAIR</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="logout" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>
      <q-drawer
        v-model="drawer"
        show-if-above
        side="left"
        bordered
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="350"
        :breakpoint="500"
        class="bg-grey-2"
      >
        <q-list padding>
          <q-item clickable v-ripple @click="$router.push({ name: 'Index' })">
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section> DASHBOARD </q-item-section>
          </q-item>

          <q-item clickable @click="$router.push({ name: 'Orders' })">
            <q-item-section avatar>
              <q-icon name="checklist" />
            </q-item-section>

            <q-item-section> PEDIDOS </q-item-section>
          </q-item>

          <q-item clickable @click="$router.push({ name: 'Products' })">
            <q-item-section avatar>
              <q-icon name="fas fa-cart-plus" />
            </q-item-section>
            <q-item-section> PRODUTOS </q-item-section>
          </q-item>

          <q-item clickable @click="$router.push({ name: 'Reports' })">
            <q-item-section avatar>
              <q-icon name="analytics" />
            </q-item-section>
            <q-item-section> RELATÓRIOS </q-item-section>
          </q-item>

          <q-item clickable @click="$router.push({ name: 'RegisterPage' })">
            <q-item-section avatar>
              <q-icon name="fas fa-user-plus" />
            </q-item-section>
            <q-item-section> FUNCIONÁRIOS </q-item-section>
          </q-item>

          <q-item clickable @click="$router.push({ name: 'Config' })">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section> CONFIGURAÇÕES </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-dialog v-model="openLogout">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
              <q-btn icon="warning" flat round dense />
              Deseja sair?
              <q-btn icon="close" flat round dense v-close-popup />
            </div>
            <q-space />
          </q-card-section>

          <!-- Modal com o método refreshPage que irá recarregar e fazer logout -->
          <q-card-section>
            <div class="q-pa-md" style="max-width: 400px">
              <q-btn
                label="SIM"
                type="submit"
                color="red"
                flat
                round
                dense
                @click="refreshPage()"
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

      <q-footer elevated class="bg-dark">
        <q-toolbar>
          <q-toolbar-title>
            <div style="text-align: center; font-size: 14px; font-weight: bold">
              Sir.Stakehouse - Todos os direitos reservados.
            </div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
// Retornando os dados do menu sidebar drawer. caso passar o mouse sobre o menu, mostrará as opções(true)

export default {
  name: "MainLayout",
  data() {
    return {
      drawer: false,
      miniState: false, // O miniState será falso para exibir o menu esquerdo ao carregar o dashboard
      openLogout: false,
      getStateUrl: `http://localhost:8000/api/users`,
      formLogin: {},
      user: {},
    };
  },
  methods: {
    refreshPage() {
      // Método que recarrega a página fazendo uma cópia diretamente do servidor
      setTimeout(function () {
        location.assign("./"); // Recarrega um novo documento voltando pra área de login
      }, 2000);
    },
  },

  async getStateLogin() {
    await axios
      .get(this.getStateUrl, this.formLogin)
      .then((response) => {
        console.log("MÉTODO VIA GET OK (GET STATE LOGIN)" + response);
      })

      .catch((error) => {
        console.error(error);
      })

      .finally((response) => {
        console.log(response);
      });
  },

  mounted() {
    this.getStateLogin();
    axios
      .get(this.getStateUrl, this.formLogin)
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        console.error(error);
      })

      .finally((response) => {
        console.log(response);
      });
  },
};
</script>
