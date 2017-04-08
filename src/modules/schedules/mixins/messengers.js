import { showConfirm } from 'utils/services/messenger/main'

export default {
  methods: {
    customConfirm (iSuccess, iErrors, color) {
      showConfirm({
        title: 'Definição da agenda',
        message: `Foram geradas ${iSuccess} regras novas, no total de ${iErrors} ignoradas.`,
        position: 'topCenter',
        timeout: 8000,
        icon: 'fa fa-check-square',
        color: color,
        buttons: {
          btn1: {
            label: 'Visualizar regras',
            callback: () => {
              this.goRouteByName('scheduleDefinitions.rules')
              console.log('dentro do callback visualizar')
            }
          },
          btn2: {
            label: 'Fechar',
            callback: () => {
              this.goRouteByName('scheduleDefinitions')
              console.log('dentro do callback fechar')
            }
          }
        }
      })
    }
  }
}
