import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Users from './modules/users/route'
import Dashboard from './modules/dashboard/route'
import Configurator from './modules/configurator/route'
import HealthInsurances from './modules/healthInsurances/route'

const routes = [ ...Users, ...Dashboard, ...Configurator, ...HealthInsurances ]
const router = new Router({ routes })

export default router
