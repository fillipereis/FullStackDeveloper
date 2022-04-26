<template>
  <div id="home">
    <div class="user-info">
      <h2>BEM VINDO, {{ user.name }}!</h2> <!-- mapState do usuário -->
      <p>SISTEMA DESENVOLVIDO COM AS TECNOLOGIAS VUE.JS, BOOTSTRAP, VUEX, VUE-RESOURCE, JWT.</p>
    </div>

    <div class="home-links">
      <router-link
        :key="i"
        class="home-link"
        :to="{ name: route.name }"
        v-for="(route, i) in routes"
      >
        <i class="material-icons md-48">
          {{ route.meta.icon }}
        </i>
        <span>{{ route.meta.label }}</span>
      </router-link>
    </div>
    <div>
      <ul class="nav-ul">
        <li class="nav-logout">
          <a href="javascript:void(0)" @click="refreshLogout()" class="nav-link">Logout </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

// Função importada que vai pegar o estado da aplicação e jogar no componente
import { mapState } from 'vuex'

export default {
  /* Função chamada dentro da computed que irá mostrar os dados do usuário autenticado,
  em tempo real, fazendo de forma dinâmica podendo reutilizar em todos os componentes da aplicação. */

  name: 'Home',
  computed: {
    ...mapState('auth', ['user']), // Prefixo 'auth' e a propriedade 'user' definido no state.js
    routes () {
      return this.$router.options.routes.filter(route => (
        route.meta && route.meta.showNavbar
      ))
    }
  },
  methods: {
    refreshLogout () {
    // Método que recarrega a página e remove o token de auth do usuário logado
      setTimeout(function () {
        localStorage.removeItem('token')
        location.assign('/login') // Carrega um novo documento e mostra o login
      }, 2100)
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex-center($columns: false) {
  display: flex;
  align-items: center;
  justify-content: center;

  @if $columns {
    flex-direction: column;
  }
}

#home {
  width: 100%;
  height: 100vh;
  @include flex-center(true);
  justify-content: space-around;

  .user-info {
    text-align: center;
  }

  .home-links {
    width: 100%;
    @include flex-center();
    .home-link {
      flex: 0 0 25%;
      margin: 0 15px;
      padding: 50px 0;
      transition: .4s;
      color: var(--white);
      @include flex-center(true);
      &:hover {
        transform: scale(1.1);
        text-decoration: none;
        box-shadow: 0 10px 20px rgba(0,0,0,0.5);
      }
    }

    .home-link:first-child { background-color: var(--blue) }
    .home-link:nth-child(2) { background-color: var(--orange) }
    .home-link:last-child { background-color: var(--red) }
  }

  .nav-ul {
    list-style-type: none;
    text-decoration: none;
  }

  .nav-logout {
    background-color: white;
    font-weight: bold;
    top: 40px;
    right: 40px;
    position: absolute;
  }
}
</style>
