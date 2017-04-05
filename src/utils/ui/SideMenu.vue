<template>
  <div class="">
    <div class="main-sidemenu">
      <span :class="{ 'nav-toggle': true, 'is-active': sideMenuState.sideMenuIsActive }" @click="sideMenu()">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div id="sideMenu" :class="{ 'nav-right': true, 'nav-menu': true, 'animated': true, 'slideInRight': true, 'slideOutRight': sideMenuState.slideOut, 'is-active': sideMenuState.sideMenuIsActive }">
        <span class="nav-item is-hidden-tablet headerWorkplaceIdent">
          {{ workplaceName }}
        </span>
        <span class="nav-item has-text-left is-hidden-tablet headerUserIdent">
          {{ userIdentification }}
        </span>
        <span class="nav-item">
          <a class="button is-primary is-inverted is-outlined">
            <span class="icon is-small">
              <i class="fa fa-calendar-check-o"></i>
            </span>
            <span>Agenda do dia</span>
          </a>
          <a class="button is-primary is-inverted is-outlined">
            <span class="icon is-small">
              <i class="fa fa-file-o"></i>
            </span>
            <span>Nova agenda</span>
          </a>
        </span>
        <div class="has-text-left" v-for="module in mainModules" v-if="isValideMenuItem(module)">
          <span class="nav-item is-hidden-tablet">
            <a class="is-active" @click="setNewRoute({ name: module.route.to } )">
              <span class="icon moduleIcon">
                <i :class="module.icon"></i>
              </span>
              {{ module.name }}
            </a>
          </span>
          <span class="nav-item is-hidden-tablet subModule" v-for="subModule in getSubModules(module.route.name)" v-if="isValideMenuItem(subModule)">
            <a @click="setNewRoute({ name: subModule.name })">
              <span class="icon moduleIcon">
                <i :class="subModule.icon"></i>
              </span>
              {{ subModule.label }}
            </a>
          </span>
        </div>
        <span class="nav-item">
          <a class="button is-danger" @click="sessionLogOff()">
            <span class="icon is-small">
              <i class="fa fa-close"></i>
            </span>
            <span>Sair</span>
          </a>
        </span>
        <!-- <span class="nav-item is-hidden-tablet fake-footer">
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import 'animate.css'
import { mapState, mapActions, mapGetters } from 'vuex'
import DmMenu from './Menu.vue'
import DmTitle from './Title.vue'
import DmSideMenu from './SideMenu.vue'

export default {
  data () {
    return {
    }
  },
  methods: {
    getSubModules (mainModule) {
      return this.$store.state[mainModule].modules
    },
    isValideMenuItem (module) {
      if (this.session.admin) return true
      if (module.adminOnly === false) return true
      return false
    },
    setNewRoute (route) {
      this.$router.push(route)
      this.closeSideMenu()
    },
    sideMenu () {
      if (this.sideMenuState.sideMenuIsActive) {
        this.closeSideMenu()
      } else {
        this.openSideMenu()
      }
    },
    ...mapActions([
      'sessionLogOff',
      'closeSideMenu',
      'openSideMenu'
    ])
  },
  components: {
    DmMenu,
    DmTitle,
    DmSideMenu
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters([
      'session',
      'mainModules',
      'sideMenuState'
    ]),
    workplaceName () {
      if (this.session.workplaces === undefined || _.isEmpty(this.session.workplaces)) return 'Usuário sem local definido'
      if (_.isEmpty(this.session.workplaces[0].name) === false) return this.session.workplaces[0].name
      if (this.session.admin) return 'Administrador (sem local de trabalho definido)'
      return 'Você não tem um local de trabalho defenido.'
    },
    userIdentification () {
      return _.startCase(_.lowerCase(this.session.name)) + ' - ' + this.session.email
    }
  },
  watch: {
  }
}
</script>

<style lang="scss">
  // @import '../../scss/config';

  .nav {
      z-index: 9
  }

  .control.has-icon > .fa {
    z-index: 1
  }
  .main-sidemenu {
  }

  .fake-footer {
    background-color: white;
    height: 300px;
  }

  .subModule {
    margin-left: 15px;
    font-style: italic;
    // background-color: rgba(255, 255, 255, 0.05);
  }

  #sideMenu {
    animation-duration: .3s;
    animation-delay: 0s;
    z-index: 9999 !important;
    // animation-iteration-count: 1;
  }

  .moduleIcon {
    margin-right: 7px;
  }

  .headerWorkplaceIdent {
    background-color: rgba(1, 1, 1, 0.19);
  }

  .headerUserIdent {
    background-color: rgba(1, 1, 1, 0.12);
  }

</style>
