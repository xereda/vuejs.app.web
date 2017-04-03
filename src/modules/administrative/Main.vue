<template>
  <div class="">
    <sub-menu :modules="modules"></sub-menu>
    <section class="section">
      <div class="container is-fluid">
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
        const { modules } = state.administrative
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
