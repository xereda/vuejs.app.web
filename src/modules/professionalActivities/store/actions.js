export default {
  pa_updateCurrentPag (context, pag) {
    context.commit('PA.UPDATE_CURRENT_PAG', pag)
  },
  pa_updateTotalDocs (context, total) {
    context.commit('PA.UPDATE_TOTAL_DOCS', total)
  },
  pa_updateFiltersSearch (context, obj) {
    context.commit('PA.UPDATE_FILTERS_SEARCH', obj)
  },
  pa_addBooleanFilter (context, field) {
    context.commit('PA.ADD_BOOLEAN_FILTER', field)
  },
  pa_removeBooleanFilter (context, field) {
    context.commit('PA.REMOVE_BOOLEAN_FILTER', field)
  },
  pa_removeAllBooleanFilter (context, array) {
    context.commit('PA.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  pa_addSortColumn (context, obj) {
    context.commit('PA.ADD_SORT_COLUMN', obj)
  },
  pa_uxModalCollapseState (context, opened) {
    context.commit('PA.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
