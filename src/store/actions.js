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
    context.commit('MASTERLOADING_CONTROL', true)
  },
  masterLoadingStart (context) {
    context.commit('MASTERLOADING_CONTROL', true)
  },
  masterLoadingStop (context) {
    context.commit('MASTERLOADING_CONTROL', false)
  },
  setSideMenuStateIsActive (context, control) {
    context.commit('SET_SIDE_MENU_STATE_ISACTIVE', control)
  },
  setSideMenuStateSlideOut (context, control) {
    context.commit('SET_SIDE_MENU_STATE_SLIDEOUT', control)
  }
}
