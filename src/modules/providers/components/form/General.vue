<template lang="html">
  <div class="">
    que legal isso aqui - {{ providerId }} - {{ state }}
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    if (this.state !== 'new' && this.state !== 'update') {
      this.$router.push({ name: 'providers' })
    }
  },
  computed: {
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
