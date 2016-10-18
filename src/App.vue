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
import 'font-awesome/css/font-awesome.css'

import dmHeader from './modules/ui/header.vue'
import dmFooter from './modules/ui/footer.vue'

export default {
  data () {
    return {
    }
  },
  mounted () {
    // this.$http.options.root = this.config.APIURIBase // nao funcionou
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
