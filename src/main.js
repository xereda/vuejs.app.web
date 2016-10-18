import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VeeValidate from 'vee-validate'
import messagesPTBR from 'vee-validate/dist/locale/pt_BR'
console.log(messagesPTBR)

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: messagesPTBR
    }
  }
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
