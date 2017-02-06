<template lang="html">
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-center">
        <a :class="{ 'nav-item': true, 'is-tab': true, 'is-active': ($route.name === module.name) }" v-for="module in config.modules">
          <router-link :to="module.route">{{ module.label }}</router-link>
        </a>
        <a :class="{ 'nav-item': true, 'is-tab': true, 'is-active': false }" @click="alerta()">
          Locais de Atendimento
        </a>
        <a :class="{ 'nav-item': true, 'is-tab': true, 'is-active': false }" @click="alerta()">
          Prestadores
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import izitoast from 'izitoast'

export default {
  methods: {
    alerta () {
      izitoast.warning({ title: 'Caution', message: 'Refactoring process started. Global modules are missing. Documentation available on the VueJS website.' })
      izitoast.error({ title: 'Error', message: 'Synchronize the new component model, please.' })
      izitoast.info({ title: 'Info', message: 'VueJS offers tools for this work.' })
    }
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
