import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Users from './modules/users/route'
import Dashboard from './modules/dashboard/route'
import Configurator from './modules/configurator/route'
import Administrative from './modules/administrative/route'
import Agreements from './modules/agreements/route'
import Cities from './modules/cities/route'
import People from './modules/people/route'
import Operators from './modules/operators/route'
import ProfessionalActivities from './modules/professionalActivities/route'
import Specialties from './modules/specialties/route'
import Holidays from './modules/holidays/route'
import Schedules from './modules/schedules/route'
import Providers from './modules/providers/route'
import Workplaces from './modules/workplaces/route'
import Login from './modules/login/route'

const routes = [
  ...Users,
  ...Dashboard,
  ...Configurator,
  ...Administrative,
  ...Agreements,
  ...Cities,
  ...People,
  ...Operators,
  ...ProfessionalActivities,
  ...Specialties,
  ...Holidays,
  ...Schedules,
  ...Providers,
  ...Workplaces,
  ...Login,
  { path: '/', redirect: '/login' }
]

const router = new Router({ routes })

export default router
