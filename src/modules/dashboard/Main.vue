<template>
  <div class="">
    <sub-menu :modules="modules"></sub-menu>
    <section class="section">
      <div class="container is-fluid">
        <h1 class="title">Dashboard Main</h1>
        <h2 class="subtitle">Visão dos dashboard do sistema</h2>
        <hr>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubMenu from 'utils/ui/SubMenu.vue'
export default {
  methods: {
    ...mapActions([
      'masterLoadingStop'
    ])
  },
  beforeMounte () {
    this.masterLoadingStop()
  },
  computed: {
  },
  components: {
    SubMenu
  }
}
</script>

<style scope>
</style>
