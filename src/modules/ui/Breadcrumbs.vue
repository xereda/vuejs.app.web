<template lang="html">
  <div class="main">
    <span>Voce está em:</span><br class="is-hidden-tablet" />
    <router-link v-for="(link, index) in links" :to="link.route" :class="{ 'is-link': isLast(index), 'uppercase': true, 'current': isLast(index) }">{{ link.name }}
      <span class="separator" v-if="!isLast(index)"> / </span>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    isLast (index) {
      return (this.links.length - 1) === index
    }
  },
  computed: {
    links () {
      return this.objectLinks
    }
  },
  props: [
    'object-links'
  ]
}
</script>

<style lang="scss" scoped>
  $separatorColor: rgb(162, 162, 162);
  $currentColor: $separatorColor;
  .main {
    margin-bottom: 20px;
  }
  .current {
    color: $currentColor;
    cursor: none;
  }
  .uppercase {
    text-transform: uppercase;
  }
  .separator {
    color: $separatorColor;
  }
</style>
