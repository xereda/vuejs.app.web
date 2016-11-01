/* eslint no-control-regex: "off" */
export default {
  general: {
    title: 'Cidades',
    subTitle: 'cadastro de cidades atendidas',
    modal: {
      titleNewDocument: 'Nova Cidade',
      titleUpdateDocument: 'Alterando uma Cidade'
    }
  },
  API: {
    resource: 'cities',
    mutationPrefix: 'CITIES'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o nome da cidade',
      error: 'Informe pelo menos 3 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3|regex:^[a-zA-Z\\s]*$',
        cssIcon: 'fa fa-globe',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    },
    state: {
      type: 'text',
      label: 'Estado',
      placeHolder: 'Informe a sigla do estado',
      error: 'Informe corretamente a sigla do estado',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:2|max:2|alpha',
        cssIcon: 'fa fa-list',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    },
    geoLocation: {
      type: 'geo',
      label: 'Geo coordenadas',
      error: 'Informe valores latitude e longitude',
      APIReturnable: true,
      required: true,
      modal: {
        // veeValidate: 'regex:^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$', // eslint-disable-line
        veeValidate: 'decimal:6',
        cssIcon: 'fa fa-map-marker',
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
