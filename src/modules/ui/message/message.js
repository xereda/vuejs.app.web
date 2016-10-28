import Vue from 'vue'
import _message from './Message.vue'
const Message = Vue.extend(_message)

const showMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages'
}) => {
  return new Message({
    el: document.createElement('div'),
    propsData
  })
}

export default showMessage
