import _ from 'lodash'

export default {
  'UPDATE_USER_SESSION' (state, payload) {
    localStorage.setItem('state.user', JSON.stringify(payload))
    state.user = payload
  },
  'UPDATE_TOKEN_SESSION' (state, accessToken) {
    localStorage.setItem('state.accessToken', accessToken)
    state.accessToken = accessToken
  },
  'SET_ACTIVE_MENU' (state, menu) {
    const index = _.findIndex(state.config.menu, e => { return e.route === menu })
    state.config.menu.forEach((e, i) => {
      state.config.menu[i].active = false
    })
    state.config.menu[index].active = true
  }
}
