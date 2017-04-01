export default {
  agreements_updateCurrentPag (context, pag) {
    context.commit('AGREEMENTS.UPDATE_CURRENT_PAG', pag)
  },
  agreements_updateTotalDocs (context, total) {
    context.commit('AGREEMENTS.UPDATE_TOTAL_DOCS', total)
  },
  agreements_updateFiltersSearch (context, obj) {
    context.commit('AGREEMENTS.UPDATE_FILTERS_SEARCH', obj)
  },
  agreements_addBooleanFilter (context, field) {
    context.commit('AGREEMENTS.ADD_BOOLEAN_FILTER', field)
  },
  agreements_removeBooleanFilter (context, field) {
    context.commit('AGREEMENTS.REMOVE_BOOLEAN_FILTER', field)
  },
  agreements_removeAllBooleanFilter (context, array) {
    context.commit('AGREEMENTS.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  agreements_addSortColumn (context, obj) {
    context.commit('AGREEMENTS.ADD_SORT_COLUMN', obj)
  },
  agreements_uxModalCollapseState (context, opened) {
    context.commit('AGREEMENTS.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
