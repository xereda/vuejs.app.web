export default {
  lives_updateCurrentPag (context, pag) {
    context.commit('LIVES.UPDATE_CURRENT_PAG', pag)
  },
  lives_updateTotalDocs (context, total) {
    context.commit('LIVES.UPDATE_TOTAL_DOCS', total)
  },
  lives_updateFiltersSearch (context, obj) {
    context.commit('LIVES.UPDATE_FILTERS_SEARCH', obj)
  },
  lives_addBooleanFilter (context, field) {
    context.commit('LIVES.ADD_BOOLEAN_FILTER', field)
  },
  lives_removeBooleanFilter (context, field) {
    context.commit('LIVES.REMOVE_BOOLEAN_FILTER', field)
  },
  lives_removeAllBooleanFilter (context, array) {
    context.commit('LIVES.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  lives_addSortColumn (context, obj) {
    context.commit('LIVES.ADD_SORT_COLUMN', obj)
  },
  lives_uxModalCollapseState (context, opened) {
    context.commit('LIVES.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
