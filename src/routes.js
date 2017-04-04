import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store/store'
import { validate as ValidateToken } from 'utils/services/auth/auth'

Vue.use(VueRouter)

import Dashboard from './modules/dashboard/route'
import Configurator from './modules/configurator/route'
import Administrative from './modules/administrative/route'
import Schedules from './modules/schedules/route'
import Login from './modules/login/route'

const routes = [
  ...Dashboard,
  ...Configurator,
  ...Administrative,
  ...Schedules,
  ...Login,
  { path: '*', redirect: '/dashboard/dashboard1' }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('masterLoadingStart')
  // store._actions.masterLoadingStart()
  window.scrollTo(0, 0)
  if (to.name === 'login') return next()
  console.log('to: ', to.name)
  console.log('state: ', store.state[to.path.split('/')[1]])
  const module = store.state[to.path.split('/')[1]].modules.filter(e => { return to.name === e.name })[0]
  console.log(module)
  if (store.state.user.admin === false && module.adminOnly) return next('/')
  ValidateToken((route) => {
    return next(route)
  })
})

router.afterEach((to, from) => {
  store.dispatch('masterLoadingStop')
})

export default router
