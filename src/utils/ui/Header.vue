<template lang="html">
  <section class="hero is-info is-small">
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
      <header class="nav">
        <div class="container is-fluid">
          <div class="nav-left">
            <a class="nav-item is-brand" @click="goHome()">
              <img src="../../img/docmob_header.svg" alt="Logo">
            </a>
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
    goHome () {
      this.$router.push({ path: '/' })
      this.closeSideMenu()
    },
    ...mapActions([
      'closeSideMenu'
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
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
