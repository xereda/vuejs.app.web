export default {
  holidays_updateCurrentPag (context, pag) {
    context.commit('HOLIDAYS.UPDATE_CURRENT_PAG', pag)
  },
  holidays_updateTotalDocs (context, total) {
    context.commit('HOLIDAYS.UPDATE_TOTAL_DOCS', total)
  },
  holidays_updateFiltersSearch (context, obj) {
    context.commit('HOLIDAYS.UPDATE_FILTERS_SEARCH', obj)
  },
  holidays_addBooleanFilter (context, field) {
    context.commit('HOLIDAYS.ADD_BOOLEAN_FILTER', field)
  },
  holidays_removeBooleanFilter (context, field) {
    context.commit('HOLIDAYS.REMOVE_BOOLEAN_FILTER', field)
  },
  holidays_removeAllBooleanFilter (context, array) {
    context.commit('HOLIDAYS.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  holidays_addSortColumn (context, obj) {
    context.commit('HOLIDAYS.ADD_SORT_COLUMN', obj)
  },
  holidays_uxModalCollapseState (context, opened) {
    context.commit('HOLIDAYS.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
