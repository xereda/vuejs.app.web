export default {
  people_updateCurrentPag (context, pag) {
    context.commit('PEOPLE.UPDATE_CURRENT_PAG', pag)
  },
  people_updateTotalDocs (context, total) {
    context.commit('PEOPLE.UPDATE_TOTAL_DOCS', total)
  },
  people_updateFiltersSearch (context, obj) {
    context.commit('PEOPLE.UPDATE_FILTERS_SEARCH', obj)
  },
  people_addBooleanFilter (context, field) {
    context.commit('PEOPLE.ADD_BOOLEAN_FILTER', field)
  },
  people_removeBooleanFilter (context, field) {
    context.commit('PEOPLE.REMOVE_BOOLEAN_FILTER', field)
  },
  people_removeAllBooleanFilter (context, array) {
    context.commit('PEOPLE.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  people_addSortColumn (context, obj) {
    context.commit('PEOPLE.ADD_SORT_COLUMN', obj)
  },
  people_uxModalCollapseState (context, opened) {
    context.commit('PEOPLE.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
