export default {
  general: {
    title: 'Planos de Saúde',
    subTitle: 'cadastro de planos de saúde',
    modal: {
      titleNewDocument: 'Novo Plano de Saúde',
      titleUpdateDocument: 'Alterando Plano de Saúde'
    }
  },
  API: {
    resource: 'healthInsurances'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o nome do plano',
      error: 'Informe pelo menos 3 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3|regex:^[a-zA-Z\\s]*$',
        cssIcon: 'fa fa-medkit',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    },
    shortName: {
      type: 'text',
      label: 'Nome curto',
      placeHolder: 'Informe um nome resumido para o plano',
      error: 'Informe pelo menos 2 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:2|regex:^[a-zA-Z\\s]*$',
        cssIcon: 'fa fa-compress',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    }
  },
  ux: {
    userDecisions: {
      modal: {
        auditInfo: {
          collapseOpened: true
        }
      }
    }
  },
  pagination: {
    limit: 10,
    currentPag: 1,
    total: 0
  },
  filters: {
    search: {
      text: '',
      fieldName: '',
      state: ''
    },
    boolean: [
    ]
  },
  sort: [
    // { field: 'name', sort: 'asc' }
  ]
}
