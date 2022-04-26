import store from '../store'

// Se a API retornar um status de não autorizado (401), volta para a página de login

export default req => {
  return ({ status }) => {
    if (status === 401) {
      store.dispatch('auth/ActionSignOut')
      window._Vue.$router.push({ name: 'login' })
    }
  }
}
