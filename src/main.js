import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './routes'

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
