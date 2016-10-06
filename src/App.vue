<template>
  <div>
    <dm-header title="titulo do site"></dm-header>
    <router-view></router-view>
    <dm-footer></dm-footer>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css'

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

<style>

</style>
