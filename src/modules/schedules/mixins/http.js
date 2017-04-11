import Http from 'utils/services/http'
import { showAPIErrors, showWarning } from 'utils/services/messenger/main'

export default {
  methods: {
    getRulesList () {
      // this.masterLoadingStart()
      Http.get('scheduleDefinitions/?workplace=' + this.session.workplaces[0]._id)
      .then(response => {
        console.log('getRulesList: ', response, response.data)
        // this.providersList = response.data.map(e => { return e.provider }).map(e => { return { _id: e._id, name: e.name } })
        response.headers['x-total-count'] > 0 ? this.rulesList = response.data : this.rulesList = []
        console.log(' this.rulesList : ', this.rulesList)
        this.masterLoadingStop()
      })
      .catch(error => {
        showAPIErrors(error.response || error)
        this.masterLoadingStop()
      })
    },
    getProvidersList (callback) {
      Http.get('workplaces/' + this.session.workplaces[0]._id + '/providers')
      .then(response => {
        console.log(response.data)
        this.providersList = response.data.map(e => { return e.provider }).map(e => { return { _id: e._id, name: e.name, checked: false } })
        callback(this.providersList)
      })
      .catch(error => {
        showAPIErrors(error.response || error)
      })
    },
    getProviderAgreements (providerId, callback) {
      Http.get('workplaces/' + this.session.workplaces[0]._id + '/providers')
      .then(response => {
        console.log('data completo: ', response.data)
        const provider = response.data.filter(e => {
          return e.provider._id === providerId
        })
        this.agreementsList = provider.map(e => { return { 'agreements': e.agreements } })
        console.log('agreements: ', this.agreementsList)
        callback(this.agreementsList[0])
      })
      .catch(error => {
        showAPIErrors(error.response || error)
      })
    },
    rulesAPIPost (arrayDataPost) {
      console.log('dentro da rulesAPIPost: ', arrayDataPost)
      let iterations = arrayDataPost.length
      let iSuccess = 0
      let iErrors = 0
      arrayDataPost.forEach(data => {
        Http.post('scheduleDefinitions', data)
        .then(response => {
          console.log(response.data)
          iterations = iterations - 1
          iSuccess = iSuccess + 1
          if (iterations === 0) {
            console.log('chegou no final das iteracoes....')
            this.customConfirm(iSuccess, iErrors, 'green')
            this.masterLoadingStop()
          }
        })
        .catch(error => {
          // showAPIErrors(error.response || error)
          console.log(error, error.response)
          iterations = iterations - 1
          iErrors = iErrors + 1
          if (iterations === 0) {
            if (iSuccess > 0) {
              this.customConfirm(iSuccess, iErrors, 'yellow')
            } else {
              showWarning({ title: 'Aviso', message: 'As regras não foram geradas. Por favor, verifique se as mesmas já não estão presentes na lista de definições.' })
            }
            this.masterLoadingStop()
          }
        })
      })
    }
  }
}
