export default {
  'UPDATE_FILTERS_SEARCH_USERS' (state, obj) {
    state.filters.search = obj
  },
  'ADD_BOOLEAN_FILTER_USERS' (state, field) {
    state.filters.boolean.push(field)
  },
  'REMOVE_BOOLEAN_FILTER_USERS' (state, field) {
    // abaixo funciona!
    let _arr = state.filters.boolean
    _arr.splice(_arr.indexOf(field), 1)
  },
  'REMOVE_ALL_BOOLEAN_FILTER_USERS' (state, array) {
    if (state.filters.boolean.length > 0) {
      state.filters.boolean = array
    }
  },
  'ADD_SORT_COLUMN_USERS' (state, obj) {
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
  'UX_MODAL_COLLAPSE_STATE_USERS' (state, opened) {
    state.ux.modal.collapse.opened = opened
  }
}
