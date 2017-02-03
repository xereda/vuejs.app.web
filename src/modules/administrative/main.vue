<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ general.title }}</h1>
      <h2 class="subtitle">{{ general.subTitle }}</h2>
      <hr>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      general: state => {
        const { general } = state.configurator
        return general
      }
    })
  }
}
</script>

<style>
</style>
