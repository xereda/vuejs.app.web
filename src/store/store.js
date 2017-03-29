import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import users from '../modules/users/store/store'
import configurator from '../modules/configurator/store/store'
import administrative from '../modules/administrative/store/store'
import agreements from '../modules/agreements/store/store'
import cities from '../modules/cities/store/store'
import people from '../modules/people/store/store'
import operators from '../modules/operators/store/store'
import professionalActivities from '../modules/professionalActivities/store/store'
import specialties from '../modules/specialties/store/store'
import holidays from '../modules/holidays/store/store'
import schedules from '../modules/schedules/store/store'
import scheduleDefinitions from '../modules/scheduleDefinitions/store/store'
import providers from '../modules/providers/store/store'
import workplaces from '../modules/workplaces/store/store'
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
    administrative,
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
