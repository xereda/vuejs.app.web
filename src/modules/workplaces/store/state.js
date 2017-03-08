export default {
  general: {
    title: 'Locais de Atendimento',
    subTitle: 'Cadastro de locais de atendimento',
    actionsTitle: {
      subTitleNewDocument: 'Adicionando um novo local',
      subTitleUpdateDocument: 'Alterando um local'
    },
    breadcrumbs: {
      new: [
        { route: '/workplaces', name: 'Locais de Atendimento', activedLink: true },
        { route: '', name: 'Novo', activedLink: false }
      ],
      update: [
        { route: '/workplaces', name: 'Locais de Atendimento', activedLink: true },
        { route: '', name: 'Atualizando', activedLink: false }
      ]
    }
  },
  API: {
    resource: 'workplaces',
    mutationPrefix: 'WORKPLACES'
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
    city: {
      type: 'reference',
      label: 'Cidade',
      filter: false,
      APIReturnable: true,
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    description: {
      type: 'text',
      label: 'Descrição',
      filter: false,
      APIReturnable: false,
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
