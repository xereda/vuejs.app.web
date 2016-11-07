export default {
  specialties_updateCurrentPag (context, pag) {
    context.commit('SPECIALTIES.UPDATE_CURRENT_PAG', pag)
  },
  specialties_updateTotalDocs (context, total) {
    context.commit('SPECIALTIES.UPDATE_TOTAL_DOCS', total)
  },
  specialties_updateFiltersSearch (context, obj) {
    context.commit('SPECIALTIES.UPDATE_FILTERS_SEARCH', obj)
  },
  specialties_addBooleanFilter (context, field) {
    context.commit('SPECIALTIES.ADD_BOOLEAN_FILTER', field)
  },
  specialties_removeBooleanFilter (context, field) {
    context.commit('SPECIALTIES.REMOVE_BOOLEAN_FILTER', field)
  },
  specialties_removeAllBooleanFilter (context, array) {
    context.commit('SPECIALTIES.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  specialties_addSortColumn (context, obj) {
    context.commit('SPECIALTIES.ADD_SORT_COLUMN', obj)
  },
  specialties_uxModalCollapseState (context, opened) {
    context.commit('SPECIALTIES.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
