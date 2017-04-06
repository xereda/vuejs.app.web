export default {
  general: {
    title: 'Ramos de Atividade',
    subTitle: 'cadastro de ramos de atividade',
    modal: {
      titleNewDocument: 'Novo Ramo de Atividade',
      titleUpdateDocument: 'Alterando um Ramo de Atividade'
    }
  },
  API: {
    resource: 'professionalActivities',
    mutationPrefix: 'PA'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o ramos de atividade',
      error: 'Informe pelo menos 3 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3',
        cssIcon: 'fa fa-briefcase',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    },
    regionalCouncilAcronym: {
      type: 'text',
      label: 'Conselho Regional',
      placeHolder: 'Informe o acrônomo do conselho regional',
      error: 'Informe corretamente o acrônomo',
      filter: true,
      APIReturnable: true,
      required: false,
      modal: {
        veeValidate: 'min:2|max:7|alpha',
        cssIcon: 'fa fa-list',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    active: {
      type: 'boolean',
      label: 'Ativo',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        responsiveCSS: 'column is-2'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    }
  },
  ux: {
    userDecisions: {
      modal: {
        AuditInfo: {
          collapseOpened: false
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
