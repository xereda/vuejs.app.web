<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent" id="lateral">
        <prestadores></prestadores>
        <convenios></convenios>
      </div>
      <div class="tile is-parent" id="agenda">
        <div class="tile is-child box">
          <div class="botoes">
            <a class="button is-medium">Mês</a>
            <a class="button is-medium">Dia</a>
          </div>
          <full-calendar :events="fcEvents" :weekNames="config.fullCalendar.locales.ptbr.weekNames" :monthNames="config.fullCalendar.locales.ptbr.monthNames" :titleFormat="config.fullCalendar.locales.ptbr.titleFormat">
          </full-calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import prestadores from './components/prestadores.vue'
import convenios from './components/convenios.vue'
import fullCalendar from 'vue-fullcalendar'

export default {
  data () {
    return {
      fcEvents: []
    }
  },
  components: {
    fullCalendar,
    prestadores,
    convenios
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      }
    })
  }
}
</script>

<style lang="scss">
  @import '~bulma';
  div#lateral {
    margin-left: -70px;
    width: 230px;
    height: 100px;
  }
  div#agenda {
    margin-left: -20px;
  }
  .botoes {
    margin-left:840px;
  }
  .panel-block {
    font-size: 15px;
    margin-left: -10px;
  }
  h1 {
    font-size: 20px;
    color: rgb(54, 62, 62);
  }
</style>
