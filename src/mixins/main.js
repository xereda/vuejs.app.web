export default {
  methods: {
    isCurrentMenu (route) {
      console.log(route, this.$route.path.split('/'))
      return route === this.$route.path.split('/')[1]
    },
    isCurrentModule (route) {
      console.log(route, this.$route.name)
      // return route === this.$route.path.split('/')[2]
      if (route === this.$route.name) return true
      if (this.$route.name.indexOf(route + '.new') > -1) return true
      if (this.$route.name.indexOf(route + '.update') > -1) return true
      return false
    }
  }
}
