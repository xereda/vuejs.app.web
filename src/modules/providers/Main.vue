<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ general.title }}</h1>
      <h2 class="subtitle">{{ general.subTitle }}</h2>
      {{ $route.matched }}
      <hr>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'dmProviders',
  data () {
    return {
    }
  },
  components: {
  },
  mounted () {
  },
  methods: {
    ...mapActions([
    ])
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.providers
        return general
      }
    })
  },
  directives: {
  },
  watch: {
  }
}
</script>

<style lang="scss">
  @import '../../scss/config';

</style>
