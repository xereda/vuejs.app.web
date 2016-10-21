import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuemoment from 'vue-moment'
import messages from './locale/veeValidate/pt_BR/messages'
import VeeValidate, { Validator } from 'vee-validate'

Vue.use(VueResource)
Vue.use(Vuemoment)
Vue.use(VeeValidate)

// Merge dictionary messages.
Validator.updateDictionary({
  pt_BR: {
    messages
  }
})
Validator.extend('ignore', {
  messages: {},
  validate: value => true
})

import App from './App'
import store from './store/store'
import router from './routes'

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
