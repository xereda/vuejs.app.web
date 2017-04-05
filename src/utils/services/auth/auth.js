import Http from '../httpAuth'
import store from 'store/store'

const validate = (callback) => {
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
    console.log('Error: ', error)
    store.dispatch('sessionLogOff')
    callback('/login/?error=1&key=' + Date.now() / 1000)
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
