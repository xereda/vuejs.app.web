export default {
  methods: {
    isCurrentMenu (route) {
      return route === this.$route.path.split('/')[1]
    },
    isCurrentModule (route) {
      // return route === this.$route.path.split('/')[2]
      if (route === this.$route.name) return true
      if (this.$route.name.indexOf(route + '.new') > -1) return true
      if (this.$route.name.indexOf(route + '.update') > -1) return true
      return false
    },
    goRouteByName (route) {
      this.$router.push({ name: route })
    },
    checkPermission (module) {
      if (this.session.admin) return true
      if (module.adminOnly === false) return true
      return false
    }
  }
}
