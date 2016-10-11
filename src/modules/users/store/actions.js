export default {
  updateFiltersSearchUsers (context, obj) {
    context.commit('UPDATE_FILTERS_SEARCH_USERS', obj)
  },
  addBooleanFilter (context, field) {
    context.commit('ADD_BOOLEAN_FILTER', field)
  },
  removeBooleanFilter (context, field) {
    context.commit('REMOVE_BOOLEAN_FILTER', field)
  },
  removeAllBooleanFilter (context, array) {
    context.commit('REMOVE_ALL_BOOLEAN_FILTER', array)
  }
}
