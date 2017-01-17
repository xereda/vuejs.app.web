<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ general.title }}</h1>
      <h2 class="subtitle">{{ general.subTitle }}</h2>
      <hr>

      <full-calendar :events="fcEvents" lang="en"></full-calendar>

    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import fullCalendar from 'vue-fullcalendar'

export default {
  data () {
    return {
      fcEvents: [
        { title: 'Consulta 1', start: '2016-11-29', end: '2016-11-29' },
        { title: 'Consulta 1', start: '2016-11-29', end: '2016-11-29' },
        { title: 'Consulta 1', start: '2016-11-29', end: '2016-11-29' },
        { title: 'Consulta 1', start: '2016-11-29', end: '2016-11-29' },
        { title: 'Consulta 1', start: '2016-11-29', end: '2016-11-29' }
      ]
    }
  },
  components: {
    fullCalendar
  },
  mounted () {
  },
  methods: {
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      general: state => {
        const { general } = state.configurator
        return general
      }
    })
  }
}
</script>

<style>
</style>
