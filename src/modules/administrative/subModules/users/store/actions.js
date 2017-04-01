export default {
  users_updateCurrentPag (context, pag) {
    context.commit('USERS.UPDATE_CURRENT_PAG', pag)
  },
  users_updateTotalDocs (context, total) {
    context.commit('USERS.UPDATE_TOTAL_DOCS', total)
  },
  users_updateFiltersSearch (context, obj) {
    context.commit('USERS.UPDATE_FILTERS_SEARCH', obj)
  },
  users_addBooleanFilter (context, field) {
    context.commit('USERS.ADD_BOOLEAN_FILTER', field)
  },
  users_removeBooleanFilter (context, field) {
    context.commit('USERS.REMOVE_BOOLEAN_FILTER', field)
  },
  users_removeAllBooleanFilter (context, array) {
    context.commit('USERS.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  users_addSortColumn (context, obj) {
    context.commit('USERS.ADD_SORT_COLUMN', obj)
  },
  users_uxModalCollapseState (context, opened) {
    context.commit('USERS.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
