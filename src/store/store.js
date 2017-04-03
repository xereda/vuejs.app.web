import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import dashboard from '../modules/dashboard/store/store'
import configurator from '../modules/configurator/store/store'
import administrative from '../modules/administrative/store/store'
import admin from '../modules/administrative/subModules/admin/store/store'
import specialties from '../modules/administrative/subModules/specialties/store/store'
import professionalActivities from '../modules/administrative/subModules/professionalActivities/store/store'
import users from '../modules/administrative/subModules/users/store/store'
import agreements from '../modules/administrative/subModules/agreements/store/store'
import operators from '../modules/administrative/subModules/operators/store/store'
import cities from '../modules/administrative/subModules/cities/store/store'
import people from '../modules/administrative/subModules/people/store/store'
import holidays from '../modules/administrative/subModules/holidays/store/store'
import providers from '../modules/administrative/subModules/providers/store/store'
import workplaces from '../modules/administrative/subModules/workplaces/store/store'
import schedules from '../modules/schedules/store/store'
import scheduleDefinitions from '../modules/scheduleDefinitions/store/store'
import login from '../modules/login/store/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    users,
    configurator,
    dashboard,
    administrative,
    admin,
    agreements,
    cities,
    people,
    operators,
    professionalActivities,
    specialties,
    holidays,
    schedules,
    scheduleDefinitions,
    providers,
    workplaces,
    login
  }
})
