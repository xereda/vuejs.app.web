import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Users from './modules/users/route'
import Dashboard from './modules/dashboard/route'
import Configurator from './modules/configurator/route'
import HealthInsurances from './modules/healthInsurances/route'
import Cities from './modules/cities/route'
import People from './modules/people/route'
import Operators from './modules/operators/route'

const routes = [ ...Users,
                 ...Dashboard,
                 ...Configurator,
                 ...HealthInsurances,
                 ...Cities,
                 ...People,
                 ...Operators
               ]
const router = new Router({ routes })

export default router
