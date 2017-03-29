<template lang="html">
  <section class="hero is-info is-small">
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
      <header class="nav">
        <div class="container">
          <div class="nav-left">
            <router-link class="nav-item is-brand" to="/dashboard">
              <img src="../../img/docmob_header.svg" alt="Logo">
            </router-link>
          </div>
          <span :class="{ 'nav-toggle': true, 'is-active': sideMenuIsActive }" @click="sideMenu()">
            <span></span>
            <span></span>
            <span></span>
          </span>
            <div id="sideMenu" :class="{ 'nav-right': true, 'nav-menu': true, 'animated': true, 'slideInRight': true, 'slideOutRight': slideOut, 'is-active': sideMenuIsActive }">
              <span class="nav-item is-hidden-tablet headerWorkplaceIdent">
                {{ workplaceName }}
              </span>
              <span class="nav-item is-hidden-tablet headerUserIdent">
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
              <div class="has-text-left" v-for="menu in menuList" v-if="isValideMenuItem(menu)">
                <span class="nav-item is-hidden-tablet">
                  <a class="" @click="setNewRoute({ name: menu.route } )">
                    <span class="icon menuIcon">
                      <i :class="menu.icon"></i>
                    </span>
                    {{ menu.name }}
                  </a>
                </span>
                <span class="nav-item is-hidden-tablet subMenu" v-for="subMenu in menu.modules" v-if="isValideMenuItem(subMenu)">
                  <a @click="setNewRoute({ path: subMenu.route })">
                    <span class="icon menuIcon">
                      <i :class="subMenu.icon"></i>
                    </span>
                    {{ subMenu.label }}
                  </a>
                </span>
              </div>
              <span class="nav-item">
                <a class="button is-danger" @click="sessionLogOff($router)">
                  <span class="icon is-small">
                    <i class="fa fa-close"></i>
                  </span>
                  <span>Sair</span>
                </a>
              </span>
            </div>
        </div>
      </header>
    </div>
    <dm-title></dm-title>
    <dm-menu></dm-menu>

  </section>
</template>

<script>
import _ from 'lodash'
import 'animate.css'
import { mapState, mapActions } from 'vuex'
import dmMenu from './Menu.vue'
import dmTitle from './Title.vue'

export default {
  data () {
    return {
      sideMenuIsActive: false,
      slideOut: false
    }
  },
  methods: {
    isValideMenuItem (menu) {
      if (this.session.admin) return true
      if (menu.adminOnly === false) return true
      return false
    },
    setNewRoute (route) {
      this.$router.push(route)
      this.slideOut = true
      setTimeout(() => {
        this.sideMenuIsActive = false
        this.slideOut = false
      }, 500)
    },
    sideMenu () {
      if (this.sideMenuIsActive) {
        this.slideOut = true
        setTimeout(() => {
          this.sideMenuIsActive = false
          this.slideOut = false
        }, 500)
      } else {
        this.sideMenuIsActive = true
      }
    },
    ...mapActions([
      'sessionLogOff',
      'setActiveMenu'
    ])
  },
  components: {
    dmMenu,
    dmTitle
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state
        return general
      },
      session: state => {
        const { user } = state
        return user
      },
      config: state => {
        const { config } = state
        return config
      },
      menu: state => {
        const { menu } = state.config
        return menu
      }
    }),
    menuList () {
      return this.menu
    },
    workplaceName () {
      if (this.session.workplaces === undefined || _.isEmpty(this.session.workplaces)) return 'Usuário sem local definido'
      if (_.isEmpty(this.session.workplaces[0].name) === false) return this.session.workplaces[0].name
      if (this.session.admin) return 'Administrador (sem local de trabalho definido)'
      return 'Você não tem um local de trabalho defenido.'
    },
    userIdentification () {
      return _.startCase(_.lowerCase(this.session.name)) + ' - ' + this.session.email
    }
  }
}
</script>

<style lang="scss" scoped>
  // @import '../../scss/config';

    .subMenu {
    margin-left: 15px;
    font-style: italic;
    // background-color: rgba(255, 255, 255, 0.05);
  }

  #sideMenu {
    animation-duration: .3s;
    animation-delay: 0s;
    // animation-iteration-count: 1;
  }

  .menuIcon {
    margin-right: 7px;
  }

  .headerWorkplaceIdent {
    background-color: rgba(1, 1, 1, 0.19);
  }

  .headerUserIdent {
    background-color: rgba(1, 1, 1, 0.12);
  }

</style>
