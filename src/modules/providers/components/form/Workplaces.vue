<template lang="html">
  <div class="">
    dentro de workplaces - {{ providerId }}
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
