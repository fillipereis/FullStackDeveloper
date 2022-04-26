import Vue from 'vue'
import routes from './routes'
import Router from 'vue-router'
import beforeEach from './beforeEach'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(beforeEach)

export default router
