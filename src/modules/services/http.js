import axios from 'axios'
import store from '../../store/store'
console.log('store.state.config.APIURIBase: ', store.state.config.APIURIBase)

const client = axios.create({
  baseURL: store.state.config.APIURIBase,
  timeout: 1000,
  headers: {}
})

export default client
