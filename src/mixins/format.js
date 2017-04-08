import _ from 'lodash'
import moment from 'moment'
import localePTBR from 'moment/locale/pt-br'
moment().locale('pt-BR', localePTBR)

export default {
  methods: {
    moment (date, format) {
      return moment.utc(date).format(format)
    },
    startCase (string) {
      return _.startCase(string.toLowerCase())
    }
  }
}
