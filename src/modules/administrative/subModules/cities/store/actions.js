export default {
  cities_updateCurrentPag (context, pag) {
    context.commit('CITIES.UPDATE_CURRENT_PAG', pag)
  },
  cities_updateTotalDocs (context, total) {
    context.commit('CITIES.UPDATE_TOTAL_DOCS', total)
  },
  cities_updateFiltersSearch (context, obj) {
    context.commit('CITIES.UPDATE_FILTERS_SEARCH', obj)
  },
  cities_addBooleanFilter (context, field) {
    context.commit('CITIES.ADD_BOOLEAN_FILTER', field)
  },
  cities_removeBooleanFilter (context, field) {
    context.commit('CITIES.REMOVE_BOOLEAN_FILTER', field)
  },
  cities_removeAllBooleanFilter (context, array) {
    context.commit('CITIES.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  cities_addSortColumn (context, obj) {
    context.commit('CITIES.ADD_SORT_COLUMN', obj)
  },
  cities_uxModalCollapseState (context, opened) {
    context.commit('CITIES.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
