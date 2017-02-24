<template lang="html">
  <div class="">
    <table class="table">
      <thead>
        <tr>
          <th class="is-hidden-mobile">Nome</th>
          <th>Apelido</th>
          <th class="is-hidden-mobile">CPF</th>
          <th class="is-hidden-mobile">Nascimento</th>
          <th class="is-hidden-mobile">Nome da mãe</th>
          <th class="is-hidden-mobile">Convênios</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="live in lives">
          <td class="is-hidden-mobile">{{ live.name }}</td>
          <td>{{ live.shortName }}</td>
          <td class="is-hidden-mobile">{{ live.cpf }}</td>
          <td class="is-hidden-mobile">{{ moment(live.birthdate, 'DD/MM/YYYY') }}</td>
          <td class="is-hidden-mobile">{{ live.mothersName }}</td>
          <td class="is-hidden-mobile">{{ getHI(live.healthInsurances) }}</td>
          <td class="is-icon">
            <a @click="">
              <span class="icon">
                <i class="fa fa-folder-open"></i>
              </span>
            </a>
          </td>
          <td class="is-icon">
            <a @click="">
              <span class="icon">
                <i class="fa fa-trash"></i>
              </span>
            </a>
          </td>
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

<style lang="css" scoped>


</style>
