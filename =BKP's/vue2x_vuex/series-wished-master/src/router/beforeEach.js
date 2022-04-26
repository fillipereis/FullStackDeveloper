/* Arquivo responsável por validar e proteger as rotas de toda a aplicação.
Caso o usuário estiver ou não logado, fará as tratativas. */
import store from '../store'

export default async (to, from, next) => {
  document.title = `${to.name} - Lista de Desejos` // Mostra o nome da rota e do projeto

  /* Se a rota da função async (to => para onde vai) não for login e usuário não estiver autenticado,
  fará o tratamento com o try catch, voltando para a página de login */

  if (to.name !== 'login' && !store.getters['auth/hasToken']) {
    try {
      await store.dispatch('auth/ActionCheckToken')

      next({ path: to.path })
    } catch (err) {
      next({ name: 'login' })
    }

    /* Caso contrário, irá redirecionar para a rota home da aplicação (Dashboard),
    retornando o usuário autenticado passando o token de autorização, mantendo na sessão */
  } else {
    if (to.name === 'login' && store.getters['auth/hasToken']) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}
