<template>
  <div>
    <dm-header v-if="$route.name !== 'login'"></dm-header>
    <router-view></router-view>
    <dm-footer v-if="$route.name !== 'login' && masterLoading === false"></dm-footer>
    <dm-loading v-show="masterLoading"></dm-loading>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import 'lodash'
import 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import 'font-awesome/css/font-awesome.css'

import dmHeader from './utils/ui/Header.vue'
import dmSubMenu from './utils/ui/SubMenu.vue'
import dmFooter from './utils/ui/Footer.vue'
import DmLoading from './utils/ui/Loading.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    dmHeader,
    dmSubMenu,
    dmFooter,
    DmLoading
  },
  methods: {
    ...mapActions([
      'sessionLogOff'
    ])
  },
  computed: {
    ...mapGetters([
      'masterLoading',
      'accessToken'
    ])
  },
  watch: {
    accessToken (val, oldVal) {
      console.log(val, oldVal)
      if (val === '' && oldVal !== '') setTimeout(() => { this.$router.push({ name: 'login' }) }, 200)
    }
  }
}
</script>

<style lang="scss">
  @import './scss/config';
  @import '~bulma';

  .modal-card {
    width: 80% !important;
    max-width: 950px !important;
    max-height: 90% !important;
    // overflow: visible !important;
  }
  .modal-card-body {
    // overflow: visible !important;
    // min-height: 400px !important;
  }
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    select,
    textarea,
    input {
      font-size: 16px;
    }
  }

  .to-upper-case {
    text-transform: uppercase;
  }

  .to-lower-case {
    text-transform: lowercase;
  }

  .table td.is-icon, .table th.is-icon {
      padding: 5px;
      text-align: center;
      white-space: nowrap;
      width: 1%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity $fadeGridTime;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .required-fields-legend {
      font-style: italic;
      font-size: 90%;
      font-weight: none;
      color: rgb(148, 148, 148);
  }

  .required-fields-legend-ast {
      font-style: italic;
      font-weight: bold;
  }

  .dm-divisor {
    height: 30px;
  }


</style>
