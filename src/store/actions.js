export default {
  updateUserSession (context, payload) {
    context.commit('UPDATE_USER_SESSION', payload)
  },
  updateCurrentPag (context, pag) {
    context.commit('UPDATE_CURRENT_PAG', pag)
  },
  updateTotalDocs (context, total) {
    context.commit('UPDATE_TOTAL_DOCS', total)
  }
}
