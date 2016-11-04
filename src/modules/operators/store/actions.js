export default {
  operators_updateCurrentPag (context, pag) {
    context.commit('OPERATORS.UPDATE_CURRENT_PAG', pag)
  },
  operators_updateTotalDocs (context, total) {
    context.commit('OPERATORS.UPDATE_TOTAL_DOCS', total)
  },
  operators_updateFiltersSearch (context, obj) {
    context.commit('OPERATORS.UPDATE_FILTERS_SEARCH', obj)
  },
  operators_addBooleanFilter (context, field) {
    context.commit('OPERATORS.ADD_BOOLEAN_FILTER', field)
  },
  operators_removeBooleanFilter (context, field) {
    context.commit('OPERATORS.REMOVE_BOOLEAN_FILTER', field)
  },
  operators_removeAllBooleanFilter (context, array) {
    context.commit('OPERATORS.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  operators_addSortColumn (context, obj) {
    context.commit('OPERATORS.ADD_SORT_COLUMN', obj)
  },
  operators_uxModalCollapseState (context, opened) {
    context.commit('OPERATORS.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
