import axios from 'axios'
import store from '../../store/store'

const client = axios.create({
  baseURL: store.state.config.APIAuth,
  timeout: 15000,
  headers: {}
})

export default client
