import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'session',
      'config'
    ])
  },
  methods: {
    ...mapActions([
      'masterLoadingStart',
      'masterLoadingStop'
    ])
  }
}
