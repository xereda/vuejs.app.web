import axios from 'axios'
import store from '../../store/store'

const client = axios.create({
  baseURL: store.state.config.APIURIBase,
  timeout: 15000,
  headers: {}
  // transformRequest (data) {
  //   // console.log('dentro do axios: ', data)
  //   return data
  // }
})

export default client
