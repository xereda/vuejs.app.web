export default {
  general: {
    title: 'Convênios',
    subTitle: 'cadastro de convênios',
    modal: {
      titleNewDocument: 'Novo Convênio',
      titleUpdateDocument: 'Alterando Convênio'
    }
  },
  API: {
    resource: 'agreements',
    mutationPrefix: 'AGREEMENTS'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o nome do convênio',
      error: 'Informe pelo menos 3 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3',
        cssIcon: 'fa fa-medkit',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    shortName: {
      type: 'text',
      label: 'Nome curto',
      placeHolder: 'Informe um nome resumido para o convênio',
      error: 'Informe pelo menos 2 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:2',
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
        AuditInfo: {
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
