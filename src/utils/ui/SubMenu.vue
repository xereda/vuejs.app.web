<template lang="html">
  <nav class="nav has-shadow is-hidden-mobile">
    <div class="container">
      <div class="nav-left">
        <a :class="{ 'nav-item': true, 'is-tab': true, 'is-active': isCurrentModule(module.route) }" v-for="module in modules">
          <router-link :to="{ name: module.route }">{{ module.label }}</router-link>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import mixins from 'mixins/main'

export default {
  mixins: [
    mixins
  ],
  props: [
    'modules'
  ]
}
</script>

<style lang="css">
</style>
