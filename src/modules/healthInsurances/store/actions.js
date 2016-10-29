export default {
  hi_updateCurrentPag (context, pag) {
    context.commit('HI.UPDATE_CURRENT_PAG', pag)
  },
  hi_updateTotalDocs (context, total) {
    context.commit('HI.UPDATE_TOTAL_DOCS', total)
  },
  hi_updateFiltersSearch (context, obj) {
    context.commit('HI.UPDATE_FILTERS_SEARCH', obj)
  },
  hi_addBooleanFilter (context, field) {
    context.commit('HI.ADD_BOOLEAN_FILTER', field)
  },
  hi_removeBooleanFilter (context, field) {
    context.commit('HI.REMOVE_BOOLEAN_FILTER', field)
  },
  hi_removeAllBooleanFilter (context, array) {
    context.commit('HI.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  hi_addSortColumn (context, obj) {
    context.commit('HI.ADD_SORT_COLUMN', obj)
  },
  hi_uxModalCollapseState (context, opened) {
    context.commit('HI.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
