<template lang="html">
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <a :class="{ 'nav-item': true, 'is-tab': true, 'is-active': ($route.name === module.name) }" v-for="module in config.modules"><router-link :to="module.route">{{ module.label }}</router-link></a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
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
