import Http from '../httpAuth'
import store from 'store/store'
import { showWarning } from 'utils/services/messenger/main'

const validate = (routeTo, routeFrom, callback) => {
  Http.get('validate-token', {
    headers: {
      'Authorization': 'JWT ' + store.state.accessToken
    }
  })
  .then(response => {
    console.log(response.data.lastChangeDate, store.state.user.lastChangeDate)
    if (response.data.lastChangeDate === store.state.user.lastChangeDate) {
      console.log('validou o token e vai acessar a rota')
      callback()
    } else {
      store.dispatch('sessionLogOff')
      callback('/login/?error=2&key=' + Date.now() / 1000)
    }
  })
  .catch(error => {
    console.log('Error do timeout saiu aqui?: ', error.response, error)
    if (error.response !== undefined && error.response.status === 401) {
      store.dispatch('sessionLogOff')
      callback('/login/?error=1&key=' + Date.now() / 1000)
    } else {
      store.dispatch('masterLoadingStop')
      showWarning({ title: 'Conexão', message: 'Houve um problema no acesso ao servidor. Verifique sua conexão e tenta novamente.' })
      callback(routeFrom.name)
    }
  })
}

const authorization = (email, password, callback, callbackError) => {
  Http.post('credential', { email, password })
  .then(response => {
    callback(response.data.accessToken, response.data.user)
  })
  .catch(error => {
    console.log('Error: ', error)
    callbackError(error)
  })
}

export {
  validate,
  authorization
}
