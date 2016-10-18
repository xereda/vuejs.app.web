<template lang="html">
  <div id="modal" :class="{ 'modal': true, 'is-active': control, 'animated': true, 'fadeIn': fadeIn, 'fadeOut': fadeOut }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button class="delete" @click="modalClose()"></button>
      </header>
      <section class="modal-card-body">
        {{ control }}
        <!-- Content ... -->
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary">Save changes</a>
        <a class="button" @click="modalClose()">Cancel</a>
      </footer>
    </div>
  </div>
</template>

<script>
import 'animate.css/animate.min.css'

export default {
  data () {
    return {
      fadeIn: true,
      fadeOut: false
    }
  },
  computed: {},
  mounted () {
  },
  methods: {
    modalClose () {
      this.fadeOut = true
      const self = this
      setTimeout(function () {
        self.fadeOut = false
        self.fadeIn = true
        self.$emit('set-modal-state', false)
      }, 510)
    }
  },
  components: {},
  props: [
    'control'
  ]
}
</script>

<style lang="scss">

#modal {
  $speed: .5s;
  $delay: 0s;
  $iteration: 1;
  -webkit-animation-duration: $speed;
  -webkit-animation-delay: $delay;
  -webkit-animation-iteration-count: $iteration;
  -moz-animation-duration: $speed;
  -moz-animation-delay: $delay;
  -moz-animation-iteration-count: $iteration;
  animation-duration: $speed;
  animation-delay: $delay;
  animation-iteration-count: $iteration;
}
</style>
