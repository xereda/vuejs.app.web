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
              <prestadores></prestadores>
              <hr>
              <convenios></convenios>
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
import navigation from 'mixins/navigation'
import session from 'mixins/session'
import prestadores from './prestadores.vue'
import convenios from './convenios.vue'
import fullCalendar from 'vue-fullcalendar'
import { DmFormCalendar } from 'utils/ui/form/main'

export default {
  data () {
    return {
      date: '',
      fcEvents: []
    }
  },
  mixins: [
    navigation,
    session
  ],
  components: {
    prestadores,
    convenios,
    fullCalendar,
    DmFormCalendar
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
