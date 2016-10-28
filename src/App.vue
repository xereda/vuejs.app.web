<template>
  <div>
    <dm-header title="titulo do site"></dm-header>
    <router-view></router-view>
    <dm-footer></dm-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import 'lodash'
import 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import 'font-awesome/css/font-awesome.css'

import dmHeader from './modules/ui/Header.vue'
import dmFooter from './modules/ui/Footer.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  mounted () {
  },
  components: {
    dmHeader,
    dmFooter
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      }
    })
  }
}
</script>

<style lang="scss">
  @import './scss/config';
  @import '~bulma';

</style>
