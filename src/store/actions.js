export default {
  updateUserSession (context, payload) {
    context.commit('UPDATE_USER_SESSION', payload)
  },
  updateTokenSession (context, accessToken) {
    context.commit('UPDATE_TOKEN_SESSION', accessToken)
  },
  sessionLogOff (context) {
    context.commit('UPDATE_USER_SESSION', {})
    context.commit('UPDATE_TOKEN_SESSION', '')
  },
  masterLoadingStart (context) {
    context.commit('MASTERLOADING_CONTROL', true)
  },
  masterLoadingStop (context) {
    context.commit('MASTERLOADING_CONTROL', false)
  }
}
