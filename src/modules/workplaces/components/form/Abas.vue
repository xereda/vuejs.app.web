<template lang="html">
  <transition name="fade">
    <div class="">
      <div class="tabs is-boxed">
        <ul>
          <li :class="{ 'is-active': isActivated('providers') }">
            <a @click="navTabs('providers')">
              <span class="icon is-small"><i class="fa fa-briefcase"></i></span>
              <span>Prestadores</span>
            </a>
          </li>
          <li :class="{ 'is-active': isActivated('users') }">
            <a @click="navTabs('users')">
              <span class="icon is-small"><i class="fa fa-users"></i></span>
              <span>Usuários</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="" v-show="isActivated('providers')">
        <dm-providers :workplaceId="workplaceId"></dm-providers>
      </div>
      <div class="" v-show="isActivated('users')">
        <dm-users :workplaceId="workplaceId"></dm-users>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>
import DmProviders from './Providers.vue'
import DmUsers from './Users.vue'

export default {
  data () {
    return {
      activatedTab: 'providers'
    }
  },
  methods: {
    navTabs (tab) {
      this.activatedTab = tab
    },
    isActivated (tab) {
      return tab === this.activatedTab
    }
  },
  components: {
    DmProviders,
    DmUsers
  },
  props: {
    workplaceId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
