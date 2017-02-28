<template lang="html">
  <transition name="fade" v-if="openned">
    <div :class="classDefinition">
      <button @click="openned = false" class="delete"></button>
      <slot>Não há mensagem definida!</slot>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      openned: true
    }
  },
  computed: {
    classDefinition () {
      return 'notification ' + this.type
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="css">
</style>
