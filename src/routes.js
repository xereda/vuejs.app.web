import Vue from 'vue'
import VueRouter from 'vue-router'
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
  if (to.name === 'login') next()
  ValidateToken((route) => {
    next(route)
  })
})

export default router
