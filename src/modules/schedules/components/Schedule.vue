<template>
  <section class="section">
    <div class="container is-fluid">
      <h1 class="title">Agenda</h1>
      <h2 class="subtitle">Agenda dos prestadores</h2></h2>
      <hr>
      <div class="">
        <div class="columns is-multiline">
          <div class="column is-3">
            <div class="box is-hidden-mobile">
              <dm-providers :providers-list="providersList" @provider-select="providerSelect" :provider-id="providerId"></dm-providers>
              <hr>
              <dm-agreements v-if="showAgreementsList" :agreements-list="agreementsList"></dm-agreements>
            </div>
          </div>
          <div class="column">
            <!-- -<dm-form-calendar v-model="date"></dm-form-calendar>- -->
            <full-calendar :events="fcEvents"
                           :week-names="config.fullCalendar.locales.ptbr.weekNames"
                           :month-names="config.fullCalendar.locales.ptbr.monthNames"
                           :title-format="config.fullCalendar.locales.ptbr.titleFormat"></full-calendar>
          </div>
        </div>
      </div>
      </div>

    </div>
  </section>
</template>

<script>
import http from '../mixins/http'
import navigation from 'mixins/navigation'
import session from 'mixins/session'
import DmProviders from './Providers.vue'
import DmAgreements from './Agreements.vue'
import fullCalendar from 'vue-fullcalendar'
import { DmFormCalendar } from 'utils/ui/form/main'

export default {
  name: 'DmSchedule',
  data () {
    return {
      date: '',
      fcEvents: [],
      providerId: '',
      providersList: [],
      agreementsList: []
    }
  },
  mounted () {
    this.getProvidersList((list) => {
      this.providersList = list
    })
  },
  mixins: [
    navigation,
    session,
    http
  ],
  components: {
    DmProviders,
    DmAgreements,
    fullCalendar,
    DmFormCalendar
  },
  computed: {
    showAgreementsList () {
      if (this.agreementsList === undefined) return false
      if (this.agreementsList.agreements === undefined) return false
      if (this.agreementsList.agreements.length === 0) return false
      return true
    }
  },
  methods: {
    providerSelect (providerId) {
      console.log('disparou a providerSelect() atraves de emit', providerId)
      this.providerId = providerId
      this.getAgreements(providerId)
    },
    getAgreements (providerId) {
      this.getProviderAgreements(providerId, (list) => {
        this.agreementsList = list
      })
    }
  }
}
</script>

<style lang="css">
</style>
