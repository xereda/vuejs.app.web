<template lang="html">
  <div class="">
    <table class="table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Apelido</th>
          <th>CPF</th>
          <th>Nascimento</th>
          <th>Nome da mãe</th>
          <th>Convênios</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="live in lives">
          <td>{{ live.name }}</td>
          <td>{{ live.shortName }}</td>
          <td>{{ live.cpf }}</td>
          <td>{{ moment(live.birthdate, 'DD/MM/YYYY') }}</td>
          <td>{{ live.mothersName }}</td>
          <td>{{ getHI(live.healthInsurances) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import localePTBR from 'moment/locale/pt-br'
import Http from '../../services/http'
import { showAPIErrors } from '../../services/messenger/main'

export default {
  name: 'dmLives',
  data () {
    return {
      lives: [{}]
    }
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      }
    })
  },
  mounted () {
    moment().locale('pt-BR', localePTBR)
    this.getLives()
  },
  methods: {
    moment (str, format) {
      return moment.utc(str).format(format)
    },
    getHI (hiList) {
      return _.map(hiList, 'healthInsurance.shortName').join(', ')
    },
    getLives () {
      Http.get('/lives/?_populate=healthInsurances.healthInsurance')
      .then((response) => {
        console.log(response.data)
        this.lives = response.data
      })
      .catch((response) => {
        console.log(response)
        showAPIErrors(response)
      })
    }
  }
}
</script>

<style lang="css">
</style>
