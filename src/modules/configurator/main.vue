<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ general.title }}</h1>
      <h2 class="subtitle">{{ general.subTitle }}</h2>
      <hr>

      <collapse accordion is-fullwidth>
         <collapse-item title="Components">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
         </collapse-item>
         <collapse-item title="Elements">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
         </collapse-item>
         <collapse-item title="Nests" selected>
         <collapse>
           <collapse-item title="Nest Child" selected>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. @bulmaio. #css #responsive
           </collapse-item>
         </collapse>
       </collapse-item>
     </collapse>

     <ul style="list-style-type:disc">
       <li>Coffee</li>
       <li>Tea</li>
       <li>Milk</li>
     </ul>

    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

import Collapse from 'xereda-vue-bulma-collapse/src/Collapse.vue'
import CollapseItem from 'xereda-vue-bulma-collapse/src/Item.vue'

import Notification from 'xereda-vue-bulma-notification'
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
    Notification,
    Collapse,
    CollapseItem
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
