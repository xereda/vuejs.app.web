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
            <li :class="{ 'is-active': isCurrentMenu(menu.route.name) }" v-for="menu in menuList"><a @click="activateMenu(menu.route.to)">{{ menu.name }}</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mixins from 'mixins/main'

export default {
  mixins: [
    mixins
  ],
  methods: {
    activateMenu (route) {
      console.log('dentro da activateMenu: ', route)
      this.$router.push({ name: route })
    }
  },
  mounted () {
  },
  computed: {
    menuList () {
      if (this.session.admin === false) return this.mainModules.filter(e => { return e.adminOnly === false })
      return this.mainModules
    },
    ...mapGetters([
      'session',
      'mainModules',
      'config'
    ])
  }
}
</script>

<style lang="css">
</style>
