<template>
  <div>
    <dm-header v-if="$route.name !== 'login'"></dm-header>
    <dm-sub-menu v-if="$route.name !== 'login'"></dm-sub-menu>
    <router-view></router-view>
    <dm-footer v-if="$route.name !== 'login'"></dm-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'lodash'
import 'sweetalert'
import 'sweetalert/dist/sweetalert.css'
import 'font-awesome/css/font-awesome.css'

import dmHeader from './utils/ui/Header.vue'
import dmSubMenu from './utils/ui/SubMenu.vue'
import dmFooter from './utils/ui/Footer.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  beforeCreate () {
  },
  components: {
    dmHeader,
    dmSubMenu,
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
