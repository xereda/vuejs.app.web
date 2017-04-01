export default {
  providers_updateCurrentPag (context, pag) {
    context.commit('PROVIDERS.UPDATE_CURRENT_PAG', pag)
  },
  providers_updateTotalDocs (context, total) {
    context.commit('PROVIDERS.UPDATE_TOTAL_DOCS', total)
  },
  providers_updateFiltersSearch (context, obj) {
    context.commit('PROVIDERS.UPDATE_FILTERS_SEARCH', obj)
  },
  providers_addBooleanFilter (context, field) {
    console.log('providers_addBooleanFilter: ', context, field)
    context.commit('PROVIDERS.ADD_BOOLEAN_FILTER', field)
  },
  providers_removeBooleanFilter (context, field) {
    context.commit('PROVIDERS.REMOVE_BOOLEAN_FILTER', field)
  },
  providers_removeAllBooleanFilter (context, array) {
    context.commit('PROVIDERS.REMOVE_ALL_BOOLEAN_FILTER', array)
  },
  providers_addSortColumn (context, obj) {
    context.commit('PROVIDERS.ADD_SORT_COLUMN', obj)
  },
  providers_uxModalCollapseState (context, opened) {
    context.commit('PROVIDERS.UX_MODAL_COLLAPSE_STATE', opened)
  }
}
