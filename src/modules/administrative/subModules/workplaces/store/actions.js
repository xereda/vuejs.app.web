export default {
  workplaces_updateCurrentPag (context, pag) {
    context.commit('WORKPLACES.UPDATE_CURRENT_PAG', pag)
  },
  workplaces_updateTotalDocs (context, total) {
    context.commit('WORKPLACES.UPDATE_TOTAL_DOCS', total)
  },
  workplaces_updateFiltersSearch (context, obj) {
    context.commit('WORKPLACES.UPDATE_FILTERS_SEARCH', obj)
  },
  workplaces_addBooleanFilter (context, field) {
    context.commit('WORKPLACES.ADD_BOOLEAN_FILTER', field)
  },
  workplaces_removeBooleanFilter (context, field) {
    context.commit('WORKPLACES.REMOVE_BOOLEAN_FILTER', field)
  },
  workplaces_removeAllBooleanFilter (context, array) {
    context.commit('WORKPLACES.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  workplaces_addSortColumn (context, obj) {
    context.commit('WORKPLACES.ADD_SORT_COLUMN', obj)
  },
  workplaces_uxModalCollapseState (context, opened) {
    context.commit('WORKPLACES.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
