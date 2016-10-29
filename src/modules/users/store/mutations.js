export default {
  'USERS.UPDATE_CURRENT_PAG' (state, pag) {
    state.pagination.currentPag = pag
  },
  'USERS.UPDATE_TOTAL_DOCS' (state, total) {
    state.pagination.total = total
  },
  'USERS.UPDATE_FILTERS_SEARCH' (state, obj) {
    state.filters.search = obj
  },
  'USERS.ADD_BOOLEAN_FILTER' (state, field) {
    state.filters.boolean.push(field)
  },
  'USERS.REMOVE_BOOLEAN_FILTER' (state, field) {
    // abaixo funciona!
    let _arr = state.filters.boolean
    _arr.splice(_arr.indexOf(field), 1)
  },
  'USERS.REMOVE_ALL_BOOLEAN_FILTER' (state, array) {
    if (state.filters.boolean.length > 0) {
      state.filters.boolean = array
    }
  },
  'USERS.ADD_SORT_COLUMN' (state, obj) {
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
  'USERS.UX_MODAL_COLLAPSE_STATE' (state, opened) {
    state.ux.userDecisions.modal.auditInfo.collapseOpened = opened
  }
}
