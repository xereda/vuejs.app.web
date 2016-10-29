export default {
  updateFiltersSearch (context, obj) {
    context.commit('UPDATE_FILTERS_SEARCH_HI', obj)
  },
  addBooleanFilter (context, field) {
    context.commit('ADD_BOOLEAN_FILTER_HI', field)
  },
  removeBooleanFilter (context, field) {
    context.commit('REMOVE_BOOLEAN_FILTER_HI', field)
  },
  removeAllBooleanFilter (context, array) {
    context.commit('REMOVE_ALL_BOOLEAN_FILTER_HI', array)
  },
  addSortColumn (context, obj) {
    context.commit('ADD_SORT_COLUMN_HI', obj)
  },
  uxModalCollapseState (context, opened) {
    context.commit('UX_MODAL_COLLAPSE_STATE_HI', opened)
  }
}
