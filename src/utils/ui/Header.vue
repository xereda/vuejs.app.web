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
          <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div class="nav-right nav-menu">
            <a class="nav-item is-active">Início</a>
            <a class="nav-item">DocMob</a>
            <a class="nav-item">Contato</a>
            <span class="nav-item">
              <a class="button is-info is-inverted">
                <span class="icon is-small">
                  <i class="fa fa-download"></i>
                </span>
                <span>Download</span>
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
import { mapState } from 'vuex'
import dmMenu from './Menu.vue'
import dmTitle from './Title.vue'

export default {
  components: {
    dmMenu,
    dmTitle
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.healthInsurances
        return general
      },
      session: state => {
        const { user } = state
        return user
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
