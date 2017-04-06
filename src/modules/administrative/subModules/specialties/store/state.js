export default {
  general: {
    title: 'Especializações',
    subTitle: 'especializações de um ramo de atividade',
    modal: {
      titleNewDocument: 'Nova Especialização',
      titleUpdateDocument: 'Alterando uma Especialização'
    }
  },
  API: {
    resource: 'specialties',
    mutationPrefix: 'SPECIALTIES'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
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
        cssIcon: 'fa fa-stethoscope',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    },
    registrationCode: {
      type: 'text',
      label: 'Código de Registro',
      placeHolder: 'Informe o código de registro da especialização',
      error: 'Informe pelo menos 2 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:2|alpha_spaces',
        cssIcon: 'fa fa-th-list',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    professionalActivity: {
      type: 'vueSelect',
      label: 'Ramo de Atividade',
      placeHolder: 'Relacione o Ramo de Atividade',
      error: '',
      filter: false,
      APIReturnable: true,
      required: false,
      modal: {
        veeValidate: 'ignore',
        // cssIcon: 'fa fa-heartbeat',
        cssIcon: '', // sem icone, ate que possamos customizar o visual do vueSelect
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
