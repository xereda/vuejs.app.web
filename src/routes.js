import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store/store'
// import _ from 'lodash'
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
  // { path: '*', redirect: '/dashboard/dashboard1?key' + Date.now() / 1000 }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log('dentro da beforeEach: ', to.name, from.name)
  store.dispatch('masterLoadingStart')
  if (to.name === 'login') {
    console.log('vai mandar para login')
    return next()
  }
  const modules = store.state[to.path.split('/')[1]].modules
  if (modules === undefined) return next('/dashboard/dasboard1/?key=' + Date.now() / 1000)
  const module = modules.filter(e => {
    return to.name === e.name
  })[0]
  if (store.state.user.admin === false && module.adminOnly) next('/dashboard/dasboard1/?key=' + Date.now() / 1000)
  ValidateToken((route) => {
    return next(route)
  })
})

router.afterEach((to, from) => {
  console.log('dentro da afterEach: ', to.name, from.name)
  window.scrollTo(0, 0)
  store.dispatch('masterLoadingStop')
})

export default router
