<template>
  <div class="">
    <sub-menu :modules="modules"></sub-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SubMenu from 'utils/ui/SubMenu.vue'
export default {
  computed: {
    ...mapState({
      modules: state => {
        const { modules } = state.schedules
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
