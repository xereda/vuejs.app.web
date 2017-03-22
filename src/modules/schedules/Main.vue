<template>
  <section class="section">
    <div class="container">

      <hr>
    </div>
  </section>
</template>


<script>
import { mapState } from 'vuex'
import prestadores from './components/prestadores.vue'
import convenios from './components/convenios.vue'
// import fullCalendar from 'vue-fullcalendar'

export default {
  data () {
    return {
      fcEvents: []
    }
  },
  components: {
    // fullCalendar,
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

<style lang="scss" scoped>

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
