<template lang="html">
  <div class="">
    dentro de blockedLives - {{ providerId }}
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    providerId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
