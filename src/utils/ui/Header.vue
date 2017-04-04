<template lang="html">
  <section class="hero is-info is-small">
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
      <header class="nav">
        <div class="container is-fluid">
          <div class="nav-left">
            <router-link class="nav-item is-brand" to="/">
              <img src="../../img/docmob_header.svg" alt="Logo">
            </router-link>
          </div>
          <dm-side-menu></dm-side-menu>
        </div>
      </header>
    </div>
    <dm-title></dm-title>
    <dm-menu></dm-menu>

  </section>
</template>

<script>
import DmMenu from './Menu.vue'
import DmTitle from './Title.vue'
import DmSideMenu from './SideMenu.vue'

export default {
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    DmMenu,
    DmTitle,
    DmSideMenu
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>
