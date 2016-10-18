export default {
  updateFiltersSearch (context, obj) {
    context.commit('UPDATE_FILTERS_SEARCH_USERS', obj)
  },
  addBooleanFilter (context, field) {
    context.commit('ADD_BOOLEAN_FILTER_USERS', field)
  },
  removeBooleanFilter (context, field) {
    context.commit('REMOVE_BOOLEAN_FILTER_USERS', field)
  },
  removeAllBooleanFilter (context, array) {
    context.commit('REMOVE_ALL_BOOLEAN_FILTER_USERS', array)
  },
  addSortColumn (context, obj) {
    context.commit('ADD_SORT_COLUMN_USERS', obj)
  }
}
