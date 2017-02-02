<template lang="html">
<div>
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">
        {{ session.workplace.name }}
      </h1>
      <h2 class="subtitle">
        {{ session.provider.name }}
        <span class="tag is-small">
          sair
          <button @click="logOff()" class="delete is-small"></button>
        </span>
      </h2>
    </div>
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
