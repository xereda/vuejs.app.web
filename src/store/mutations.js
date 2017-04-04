export default {
  'UPDATE_USER_SESSION' (state, payload) {
    localStorage.setItem('state.user', JSON.stringify(payload))
    state.user = payload
  },
  'UPDATE_TOKEN_SESSION' (state, accessToken) {
    localStorage.setItem('state.accessToken', accessToken)
    state.accessToken = accessToken
  },
  'MASTERLOADING_CONTROL' (state, control) {
    state.masterLoading = control
  }
}
