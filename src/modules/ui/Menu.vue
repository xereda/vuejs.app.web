<template lang="html">
  <div>
    <div class="hero-foot">
      <nav class="tabs is-boxed">
        <div class="container">
          <ul>
            <li :class="($route.name === 'dashboard') ? 'is-active' : ''"><router-link to="/dashboard">Dashboard</router-link></li>
            <li :class="($route.name === 'schedules') ? 'is-active' : ''"><router-link to="/schedules">Agenda</router-link></li>
            <li :class="($route.name === 'attendance') ? 'is-active' : ''"><router-link to="/attendance">Atendimento</router-link></li>
            <li :class="($route.name === 'administrative') ? 'is-active' : ''"><router-link to="/administrative">Administração</router-link></li>
            <li :class="($route.name === 'configurator') ? 'is-active' : ''"><router-link to="/configurator">Configuração</router-link></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    logOff () {
      console.log('logOff')
    }
  },
  mounted () {
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
