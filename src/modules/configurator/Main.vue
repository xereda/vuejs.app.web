<template>
  <div class="">
    <sub-menu :modules="modules"></sub-menu>
    <section class="section">
      <div class="container is-fluid">
        <h1 class="title">Ajustes gerais</h1>
        <h2 class="subtitle">Personalização do sistema</h2>
        <hr>
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SubMenu from 'utils/ui/SubMenu.vue'
export default {
  computed: {
    ...mapState({
      modules: state => {
        const { modules } = state.configurator
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
