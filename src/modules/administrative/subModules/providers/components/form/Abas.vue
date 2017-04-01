<template lang="html">
  <transition name="fade">
    <div class="">
      <div class="tabs is-boxed">
        <ul>
          <li :class="{ 'is-active': isActivated('specialties') }">
            <a @click="navTabs('specialties')">
              <span class="icon is-small"><i class="fa fa-wrench"></i></span>
              <span>Especialidades</span>
            </a>
          </li>
          <li :class="{ 'is-active': isActivated('blockedLives') }">
            <a @click="navTabs('blockedLives')">
              <span class="icon is-small"><i class="fa fa-lock"></i></span>
              <span>Vidas bloqueadas</span>
            </a>
          </li>
          <li :class="{ 'is-active': isActivated('workplaces') }">
            <a @click="navTabs('workplaces')">
              <span class="icon is-small"><i class="fa fa-map-marker"></i></span>
              <span>Locais de atendimento</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="" v-show="isActivated('specialties')">
        <dm-specialties :providerId="providerId"></dm-specialties>
      </div>
      <div class="" v-show="isActivated('blockedLives')">
        <dm-blocked-lives :providerId="providerId"></dm-blocked-lives>
      </div>
      <div class="" v-show="isActivated('workplaces')">
        <dm-workplaces :providerId="providerId"></dm-workplaces>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>
import DmSpecialties from './Specialties.vue'
import DmBlockedLives from './BlockedLives.vue'
import DmWorkplaces from './Workplaces.vue'

export default {
  data () {
    return {
      activatedTab: 'specialties'
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
    DmSpecialties,
    DmBlockedLives,
    DmWorkplaces
  },
  props: {
    providerId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
