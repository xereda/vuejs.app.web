export default {
  'PROVIDERS.UPDATE_CURRENT_PAG' (state, pag) {
    state.pagination.currentPag = pag
  },
  'PROVIDERS.UPDATE_TOTAL_DOCS' (state, total) {
    state.pagination.total = total
  },
  'PROVIDERS.UPDATE_FILTERS_SEARCH' (state, obj) {
    state.filters.search = obj
  },
  'PROVIDERS.ADD_BOOLEAN_FILTER' (state, field) {
    console.log('PROVIDERS.ADD_BOOLEAN_FILTER: ', (new Date()).getTime(), state, field)
    state.filters.boolean.push(field)
  },
  'PROVIDERS.REMOVE_BOOLEAN_FILTER' (state, field) {
    // abaixo funciona!
    let _arr = state.filters.boolean
    _arr.splice(_arr.indexOf(field), 1)
  },
  'PROVIDERS.REMOVE_ALL_BOOLEAN_FILTER' (state, array) {
    if (state.filters.boolean.length > 0) {
      state.filters.boolean = array
    }
  },
  'PROVIDERS.ADD_SORT_COLUMN' (state, obj) {
    let _sort = state.sort
    _sort = _sort.filter((element) => {
      return element.field !== obj.field
    })
    if (obj.sort === 'desc' || obj.sort === '') {
      _sort.unshift({ field: obj.field, sort: 'asc' })
    } else {
      _sort.unshift({ field: obj.field, sort: 'desc' })
    }
    state.sort = _sort
  },
  'PROVIDERS.UX_MODAL_COLLAPSE_STATE' (state, opened) {
    state.ux.userDecisions.modal.AuditInfo.collapseOpened = opened
  }
}
