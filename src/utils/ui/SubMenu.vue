<template lang="html">
  <nav class="nav has-shadow is-hidden-mobile">
    <!-- {{ moduleList }} -->
    <div class="container">
      <div class="nav-left">
        <a :class="{ 'nav-item': true, 'is-tab': true, 'is-active': isCurrentMenu(module.route) }" v-for="module in moduleList">
          <router-link :to="module.route">{{ module.label }}</router-link>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import mixins from 'mixins/main'

export default {
  mixins: [
    mixins
  ],
  methods: {
    activeMenu () {
      return this.menu.filter(e => {
        return this.isCurrentMenu(e.route)
      })
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
    moduleList () {
      const _list = this.activeMenu()
      return _list[0].modules
    }
  }
}
</script>

<style lang="css">
</style>
