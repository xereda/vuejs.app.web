export default {
  general: {
    title: 'Operadoras',
    subTitle: 'operadoras de um convênio',
    modal: {
      titleNewDocument: 'Nova Operadora',
      titleUpdateDocument: 'Alterando uma Operadora'
    }
  },
  API: {
    resource: 'operators',
    mutationPrefix: 'OPERATORS'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o nome da operadora',
      error: 'Informe pelo menos 3 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3|alpha_spaces',
        cssIcon: 'fa fa-heartbeat',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    },
    agreement: {
      type: 'vueSelect',
      label: 'Convênio',
      placeHolder: 'Relacione o convênio',
      error: '',
      filter: false,
      APIReturnable: false,
      required: false, // tem bug no vee-validate, por isso esta como false
      modal: {
        veeValidate: 'ignore',
        // cssIcon: 'fa fa-heartbeat',
        cssIcon: '', // sem icone, ate que possamos customizar o visual do vueSelect
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: false,
          class: 'is-hidden-mobile'
        }
      }
    },
    ANSCode: {
      type: 'text',
      label: 'Código ANS',
      placeHolder: 'Informe o código ANS',
      error: 'Informe corretamente o código ANS',
      filter: true,
      APIReturnable: true,
      required: false,
      modal: {
        veeValidate: 'min:3',
        cssIcon: 'fa fa-heartbeat',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    internalCode: {
      type: 'text',
      label: 'Código interno',
      placeHolder: 'Informe o código interno',
      error: 'Informe corretamente o código interno',
      filter: true,
      APIReturnable: true,
      required: false,
      modal: {
        veeValidate: 'min:3',
        cssIcon: 'fa fa-heartbeat',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: false,
          class: 'is-hidden-mobile'
        }
      }
    },
    'webService.uri': {
      type: 'text',
      parentObject: {
        objectName: 'webService',
        propertieName: 'uri'
      },
      label: 'webService',
      placeHolder: 'Informe o webService',
      error: 'Informe corretamente a url do serviço',
      filter: false,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'url',
        cssIcon: 'fa fa-heartbeat',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: false,
          class: 'is-hidden-mobile'
        }
      }
    },
    'webService.user': {
      type: 'text',
      parentObject: {
        objectName: 'webService',
        propertieName: 'user'
      },
      label: 'WS Usuário',
      placeHolder: 'Informe do usuário',
      error: 'Informe corretamente o nome do usuário',
      filter: false,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3',
        cssIcon: 'fa fa-heartbeat',
        responsiveCSS: 'column is-3'
      },
      table: {
        header: {
          visible: false,
          class: 'is-hidden-mobile'
        }
      }
    },
    'webService.password': {
      type: 'password',
      parentObject: {
        objectName: 'webService',
        propertieName: 'password'
      },
      label: 'WS Senha',
      placeHolder: 'Informe a senha do usuário WS',
      error: 'Informe corretamente o nome do usuário WS',
      required: true,
      modal: {
        veeValidate: 'min:3',
        cssIcon: 'fa fa-heartbeat',
        responsiveCSS: 'column is-3'
      },
      table: {
        header: {
          visible: false,
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
        responsiveCSS: 'column is-3'
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
