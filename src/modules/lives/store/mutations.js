export default {
  'LIVES.UPDATE_CURRENT_PAG' (state, pag) {
    state.pagination.currentPag = pag
  },
  'LIVES.UPDATE_TOTAL_DOCS' (state, total) {
    state.pagination.total = total
  },
  'LIVES.UPDATE_FILTERS_SEARCH' (state, obj) {
    state.filters.search = obj
  },
  'LIVES.ADD_BOOLEAN_FILTER' (state, field) {
    state.filters.boolean.push(field)
  },
  'LIVES.REMOVE_BOOLEAN_FILTER' (state, field) {
    // abaixo funciona!
    let _arr = state.filters.boolean
    _arr.splice(_arr.indexOf(field), 1)
  },
  'LIVES.REMOVE_ALL_BOOLEAN_FILTER' (state, array) {
    if (state.filters.boolean.length > 0) {
      state.filters.boolean = array
    }
  },
  'LIVES.ADD_SORT_COLUMN' (state, obj) {
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
  'LIVES.UX_MODAL_COLLAPSE_STATE' (state, opened) {
    state.ux.userDecisions.modal.auditInfo.collapseOpened = opened
  }
}
