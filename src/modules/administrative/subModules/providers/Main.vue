<template>
  <div class="">
    <h1 class="title">{{ general.title }}</h1>
    <h2 class="subtitle">{{ subTitle }}</h2>
    <hr>
    <router-view></router-view>
  </div>
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
    }),
    subTitle () {
      if (this.$route.name.indexOf('.new') > -1) return this.general.actionsTitle.subTitleNewDocument
      if (this.$route.name.indexOf('.update') > -1) return this.general.actionsTitle.subTitleUpdateDocument
      return this.general.subTitle
    }
  },
  directives: {
  },
  watch: {
    '$route.name' (val, oldVal) {
      console.log('rota: ', val, oldVal)
    }
  }
}
</script>

<style lang="scss">
  @import '~scss/config';

</style>
