<template>
  <div class="">
    <sub-menu :modules="modules"></sub-menu>
    <section class="section">
      <div class="container is-fluid">
        <h1 class="title">Dashboard</h1>
        <h2 class="subtitle">Visão dos dashboard do sistema</h2>
        <hr>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
    ...mapState({
      modules: state => {
        const { modules } = state.dashboard
        return modules
      }
    })
  },
  components: {
    SubMenu
  }
}
</script>

<style scope>
</style>
