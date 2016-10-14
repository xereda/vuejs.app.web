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
  },
  'ADD_SORT_COLUMN' (state, obj) {
    console.log('dentro da ADD_SORT_COLUMN: ', obj)
    const _sort = state.sort
    console.log('_sort: ', _sort)
    if (_sort.indexOf(obj.name) > -1) {
      _sort.splice(_sort.indexOf(obj.name), 1)
    }
    console.log('_sort.splice: ', _sort)
    obj.order === false ? _sort.push('-' + obj.name) : _sort.push(obj.name)
    console.log('_sort.push: ', _sort)
  }
}
