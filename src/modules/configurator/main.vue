<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ general.title }}</h1>
      <h2 class="subtitle">{{ general.subTitle }}</h2>
      <hr>

      <!-- <div>
        <p>
          <vb-switch type="success" size="large" :value="value" checked @change="updateValue"></vb-switch>
        </p>
        <p>
          {{ modalDoc.admin }}
        </p>
      </div> -->

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import Vue from 'vue'
// import VbSwitch from 'vue-bulma-switch'

import Notification from 'vue-bulma-notification'
const NotificationComponent = Vue.extend(Notification)
const openNotification = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

export default {
  data () {
    return {
      modalDoc: {
        admin: false
      }
    }
  },
  components: {
    Notification
    // VbSwitch
  },
  mounted () {
    openNotification({
      message: 'Success lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit',
      type: 'success',
      duration: 2000
    })
  },
  methods: {
    updateValue (val) {
      this.modalDoc.admin = val
    },
    openNotificationWithType (type) {
      openNotification({
        title: 'This is a title',
        message: 'This is the message.',
        type: type
      })
    }
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.configurator
        return general
      }
    })
  }
}
</script>

<style>
</style>
