<template>
  <div>
    <dm-header title="titulo do site"></dm-header>
    <router-view></router-view>
    <dm-footer></dm-footer>
  </div>
</template>

<script>
import 'lodash'
import 'sweetalert'
import 'font-awesome/css/font-awesome.css'
// import 'bulma/css/bulma.css'

import dmHeader from './modules/ui/header.vue'
import dmFooter from './modules/ui/footer.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    dmHeader,
    dmFooter
  }
}
</script>

<style lang="sass">

  $blue: #3273dc
  $grey-light: #b5b5b5
  $link: $grey-light
  $link-hover: $blue
  @import '~bulma'

</style>
