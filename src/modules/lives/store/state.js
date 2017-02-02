export default {
  general: {
    title: 'Vidas',
    subTitle: 'cadastro de vidas',
    modal: {
      titleNewDocument: 'Nova Vida',
      titleUpdateDocument: 'Alterando uma Vida'
    }
  },
  API: {
    resource: 'lives',
    mutationPrefix: 'LIVES'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    person: {
      type: 'vueSelect',
      label: 'Pessoa',
      placeHolder: 'Informe o titular da vida',
      error: '',
      filter: false,
      APIReturnable: false,
      required: false,
      modal: {
        veeValidate: 'ignore',
        // cssIcon: 'fa fa-heartbeat',
        cssIcon: '', // sem icone, ate que possamos customizar o visual do vueSelect
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: false,
          class: ''
        }
      }
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o nome da especialização',
      error: 'Informe pelo menos 3 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3',
        cssIcon: 'fa fa-user',
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
      label: 'Nome Curto',
      placeHolder: 'Informe como deseja ser chamado',
      error: 'Informe pelo menos 3 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3',
        cssIcon: 'fa fa-compress',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    cpf: {
      type: 'cpf',
      label: 'CPF',
      placeHolder: 'Informe o CPF',
      error: 'Informe um CPF válido',
      filter: true,
      APIReturnable: true,
      required: false,
      modal: {
        veeValidate: 'numeric',
        cssIcon: 'fa fa-compress',
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
        responsiveCSS: 'column is-6'
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
