import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import users from '../modules/users/store/store'
import configurator from '../modules/configurator/store/store'
import healthInsurances from '../modules/healthInsurances/store/store'
import cities from '../modules/cities/store/store'
import people from '../modules/people/store/store'
import operators from '../modules/operators/store/store'
import professionalActivities from '../modules/professionalActivities/store/store'
import specialties from '../modules/specialties/store/store'
import holidays from '../modules/holidays/store/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    users,
    configurator,
    healthInsurances,
    cities,
    people,
    operators,
    professionalActivities,
    specialties,
    holidays
  }
})
