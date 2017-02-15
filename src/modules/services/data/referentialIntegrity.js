import Http from './http'
import { showAPIErrors } from '../messenger/main'

const checkRefIntegrity = async (_resource, _params) => {
  let _total = 0
  await Http.get(_resource + _params)
  .then((response) => {
    _total = parseInt(response.headers['x-total-count'])
  })
  .catch((error) => {
    console.log('Error', error.response)
    showAPIErrors(error.response)
  })
  return _total
}

export {
  checkRefIntegrity
}
