export default {
  general: {
    title: 'Feriados',
    subTitle: 'Feríados',
    modal: {
      titleNewDocument: 'Novo Feriado',
      titleUpdateDocument: 'Alterando um Feriado'
    }
  },
  API: {
    resource: 'holidays',
    mutationPrefix: 'HOLIDAYS'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    date: {
      type: 'date',
      label: 'Data Feriado',
      placeHolder: 'Selecione a data do feriado',
      error: 'Informe uma data válida',
      filter: false,
      APIReturnable: true,
      required: true,
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o título do feriado',
      error: 'Informe um título para o feriado',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3',
        // cssIcon: 'fa fa-heartbeat',
        cssIcon: 'fa fa-calendar-o', // sem icone, ate que possamos customizar o visual do vueSelect
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    },
    recurrent: {
      type: 'boolean',
      label: 'Recorrente',
      filter: true,
      APIReturnable: true,
      required: false,
      modal: {
        responsiveCSS: 'column is-3'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    regional: {
      type: 'boolean',
      label: 'Regional',
      filter: true,
      APIReturnable: true,
      required: false,
      modal: {
        responsiveCSS: 'column is-3'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    city: {
      type: 'text',
      label: 'Cidade',
      filter: false,
      APIReturnable: true,
      required: false,
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
