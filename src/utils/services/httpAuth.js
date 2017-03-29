import axios from 'axios'
import store from '../../store/store'

const client = axios.create({
  baseURL: store.state.config.APIAuth,
  timeout: 10000,
  headers: {}
})

export default client
