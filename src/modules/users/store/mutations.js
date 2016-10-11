export default {
  'UPDATE_FILTERS_SEARCH_USERS' (state, obj) {
    state.filters.search = obj
  },
  'ADD_BOOLEAN_FILTER' (state, field) {
    state.filters.boolean.push(field)
  },
  'REMOVE_BOOLEAN_FILTER' (state, field) {
    // abaixo funciona!
    let _arr = state.filters.boolean
    _arr.splice(_arr.indexOf(field), 1)
  },
  'REMOVE_ALL_BOOLEAN_FILTER' (state, array) {
    if (state.filters.boolean.length > 0) {
      state.filters.boolean = array
    }
  }
}
