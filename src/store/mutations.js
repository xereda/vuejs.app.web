export default {
  'UPDATE_USER_SESSION' (state, payload) {
    state.user = payload
  },
  'UPDATE_CURRENT_PAG' (state, pag) {
    state.config.pagination.currentPag = pag
  },
  'UPDATE_TOTAL_DOCS' (state, total) {
    state.config.pagination.total = total
  }
}
