<template>
    <datepicker placeholder="inline mode" :options="{inline: true}"></datepicker>
</template>

<script>
import Vue from 'vue'
import VueBlu from 'vue-blu'
Vue.use(VueBlu)

export default {
  name: 'DmFormCalendar'
}
</script>

<style lang="scss" scoped>
  // @import '~vue-blu/dist/css/vue-blu.min.css'
</style>
