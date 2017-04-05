<template lang="html">
  <div class="is-hidden-mobile">
    <div class="hero-foot">
      <nav class="tabs is-boxed">
        <div class="container is-fluid">
          <ul>
            <li :class="{ 'is-active': isCurrentMenu(menu.route.name) }" v-for="menu in menuList"><a @click="goRouteByName(menu.route.to)">{{ menu.name }}</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import nagivation from 'mixins/navigation'

export default {
  mixins: [
    nagivation
  ],
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
