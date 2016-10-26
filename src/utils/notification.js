import Vue from 'vue'
import _notification from 'vue-bulma-notification'
const Notification = Vue.extend(_notification)

const showNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new Notification({
    el: document.createElement('div'),
    propsData
  })
}

export default showNotification
