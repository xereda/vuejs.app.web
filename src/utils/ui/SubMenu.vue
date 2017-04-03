<template lang="html">
  <nav class="nav has-shadow is-hidden-mobile">
    <div class="container is-fluid">
      <div class="nav-left">
        <a @click="goRouteByName(module.route)"
           :class="{ 'nav-item': true, 'is-tab': true, 'is-active': isCurrentModule(module.route) }"
           v-for="module in modules"
           v-if="checkPermission(module)">
          {{ module.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import mixins from 'mixins/main'
import { mapGetters } from 'vuex'

export default {
  mixins: [
    mixins
  ],
  computed: {
    ...mapGetters([
      'session'
    ])
  },
  props: [
    'modules'
  ]
}
</script>

<style lang="css">
</style>
