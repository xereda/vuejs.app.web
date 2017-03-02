<template lang="html">
  <transition name="fade">
    <div class="">
      <dm-breadcrumbs :object-links="breadcrumbs.new"></dm-breadcrumbs>

      <div class="container box">
        <p class="title is-4">Dados Gerais</p>
        <div class="columns is-multiline">
          <div class="column is-6">
            1
          </div>
          <div class="column">
            2
          </div>
          <div class="column">
            3
          </div>
        </div>
        <div class="">
          nova linha
        </div>
      </div>

    </div>
  </transition>

</template>

<script>
import { mapState } from 'vuex'
import DmBreadcrumbs from '../../../ui/Breadcrumbs.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    DmBreadcrumbs
  },
  mounted () {
    if (this.state !== 'new' && this.state !== 'update') {
      this.$router.push({ name: 'providers' })
    }
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.providers
        return general
      },
      breadcrumbs: state => {
        const { breadcrumbs } = state.providers.general
        return breadcrumbs
      }
    }),
    providerId () {
      return this.$route.params.providerId !== undefined ? this.$route.params.providerId : ''
    },
    state () {
      return this.$route.params.state !== undefined ? this.$route.params.state : ''
    }
  },
  watch: {
    '$route.params.state' (val, oldVal) {
      if (val !== 'new' && val !== 'update') {
        this.$router.push({ name: 'providers' })
      }
    }
  }
}
</script>

<style lang="css">
</style>
