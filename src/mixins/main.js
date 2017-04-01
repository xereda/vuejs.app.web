import _ from 'lodash'

export default {
  methods: {
    isCurrentMenu (route) {
      if (route === this.$route.name) return true
      const objectMenu = this.menu.filter(menu => {
        if (menu.route !== route) return false
        const _module = menu.modules.filter(module => {
          if (module.route === this.$route.name) return true
        })
        if (_.isEmpty(_module) === false) return true
      })
      if (_.isEmpty(objectMenu)) return false
      if (objectMenu[0].route === route) return true
      return false
    }
  }
}
