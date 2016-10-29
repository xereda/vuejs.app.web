export default {
  updateUserSession (context, payload) {
    context.commit('UPDATE_USER_SESSION', payload)
  }
}
