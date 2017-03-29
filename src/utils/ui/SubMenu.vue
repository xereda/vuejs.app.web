<template lang="html">
  <nav class="nav has-shadow is-hidden-mobile">
    <div class="container">
      <!-- {{ subMenuList }} -->
      <div class="nav-left">
        <a :class="{ 'nav-item': true, 'is-tab': true, 'is-active': isCurrentRoute(menu) }" v-for="menu in subMenuList">
          <router-link :to="menu.route">{{ menu.label }}</router-link>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    isCurrentRoute (module) {
      if (this.$route.name === undefined) return false
      if (this.$route.name === null) return false
      if (this.$route.name.indexOf(module.name) === -1) return false
      return true
    }
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
    activeMenu () {
      return this.menu.filter(e => { return e.active })[0] || {}
    },
    subMenuList () {
      return this.activeMenu.modules
    }
  }
}
</script>

<style lang="css">
</style>
