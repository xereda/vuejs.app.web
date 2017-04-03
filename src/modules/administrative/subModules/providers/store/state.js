export default {
  general: {
    title: 'Prestadores',
    subTitle: 'Cadastro de prestadores',
    actionsTitle: {
      subTitleNewDocument: 'Adicionando um novo prestador',
      subTitleUpdateDocument: 'Alterando um prestador'
    },
    breadcrumbs: {
      new: [
        { route: '/administrative/providers', name: 'Prestadores', activedLink: true },
        { route: '', name: 'Novo', activedLink: false }
      ],
      update: [
        { route: '/administrative/providers', name: 'Prestadores', activedLink: true },
        { route: '', name: 'Atualizando', activedLink: false }
      ]
    }
  },
  API: {
    resource: 'providers',
    mutationPrefix: 'PROVIDERS'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    name: {
      type: 'text',
      label: 'Nome',
      filter: true,
      APIReturnable: true,
      table: {
        header: {
          visible: true,
          class: ''
        }
      }
    },
    email: {
      type: 'email',
      label: 'E-mail',
      filter: true,
      APIReturnable: true,
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    entityType: {
      type: 'text',
      label: 'Tipo',
      filter: false,
      APIReturnable: true,
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    cpf: {
      type: 'text',
      label: 'CPF',
      filter: true,
      APIReturnable: true,
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    cnpj: {
      type: 'text',
      label: 'CNPJ',
      filter: true,
      APIReturnable: true,
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
      required: false,
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
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
