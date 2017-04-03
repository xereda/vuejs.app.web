export default {
  session: state => {
    const { user } = state
    return user
  },
  mainModules: state => {
    const { mainModules } = state.config
    return mainModules
  },
  config: state => {
    const { config } = state
    return config
  },
  accessToken: state => {
    const { accessToken } = state
    return accessToken
  }
}
