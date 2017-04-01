import Http from '../httpAuth'
import store from 'store/store'

const validate = (callback) => {
  Http.get('validate-token', {
    headers: {
      'Authorization': 'JWT ' + store.state.accessToken
    }
  })
  .then(response => {
    console.log('response.data: ', response.data)
    response.data.lastChangeDate === store.state.user.lastChangeDate ? callback() : callback('/login/?error=2')
  })
  .catch(error => {
    console.log('Error: ', error)
    callback('/login/?error=1')
  })
}

const authorization = (email, password, callback, callbackError) => {
  console.log(email, password)
  Http.post('credential', { email, password })
  .then(response => {
    console.log('response.data: ', response.data)
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
