<template lang="html">
  <div class="is-hidden-mobile">
    <div class="hero-foot">
      <nav class="tabs is-boxed">
        <div class="container">
          <!-- <ul>
            <li :class="($route.name === 'dashboard') ? 'is-active' : ''"><router-link to="/dashboard">Dashboard</router-link></li>
            <li :class="($route.name === 'schedules') ? 'is-active' : ''"><router-link to="/schedules">Agenda</router-link></li>
            <li :class="($route.name === 'attendance') ? 'is-active' : ''"><router-link to="/attendance">Atendimento</router-link></li>
            <li :class="(isAdministrativeRoute) ? 'is-active' : ''"><router-link to="/administrative">Administração</router-link></li>
            <li :class="($route.name === 'configurator') ? 'is-active' : ''"><router-link to="/configurator">Configuração</router-link></li>
          </ul> -->
          <ul>
            <li :class="{ 'is-active': isActive(menu.route) || menu.active }" v-for="menu in menuList"><a @click="activateMenu(menu.route)">{{ menu.name }}</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
// import _ from 'lodash'

export default {
  methods: {
    ...mapActions([
      'setActiveMenu'
    ]),
    isActive (route) {
      return route === this.$route.name
    },
    activateMenu (route) {
      console.log('dentro da activateMenu: ', route)
      this.setActiveMenu(route)
      this.$router.push({ name: route })
    }
  },
  mounted () {
  },
  computed: {
    menuList () {
      if (this.session.admin === false) return this.menu.filter(e => { return e.adminOnly === false })
      return this.menu
    },
    ...mapState({
      session: state => {
        const { user } = state
        return user
      },
      menu: state => {
        const { menu } = state.config
        return menu
      },
      config: state => {
        const { config } = state
        return config
      }
    })
  }
}
</script>

<style lang="css">
</style>
