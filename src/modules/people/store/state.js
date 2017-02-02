export default {
  general: {
    title: 'Pessoas',
    subTitle: 'cadastro de pessoas (usuário final do DocMob)',
    modal: {
      titleNewDocument: 'Nova Pessoa',
      titleUpdateDocument: 'Alterando uma Pessoa'
    }
  },
  API: {
    resource: 'people',
    mutationPrefix: 'PEOPLE'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o nome da pessoa',
      error: 'Informe pelo menos 3 caracteres',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:3|regex:^[a-zA-Z\\s]*$',
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
    email: {
      type: 'email',
      label: 'E-mail',
      placeHolder: 'Informe o e-mail da pessoa',
      error: 'Informe um e-mail válido',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'email',
        cssIcon: 'fa fa-envelope',
        responsiveCSS: 'column is-6',
        readOnlyOnUpdate: true
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    },
    password: {
      type: 'password',
      label: 'Senha',
      placeHolder: 'Informe a senha',
      error: 'Informe uma senha válida',
      required: true,
      modal: {
        veeValidate: 'confirmed:password2|min:5',
        cssIcon: 'fa fa-lock',
        responsiveCSS: 'column is-3',
        hiddenOnUpdate: true
      }
    },
    password2: {
      type: 'password',
      label: 'Repita a senha',
      placeHolder: 'Repita a senha',
      error: 'Repita a senha corretamente',
      required: true,
      modal: {
        cssIcon: 'fa fa-lock',
        responsiveCSS: 'column is-3',
        hiddenOnUpdate: true
      }
    },
    phone: {
      type: 'text',
      label: 'Telefone',
      placeHolder: 'Informe o telefone',
      error: 'Informe um telefone válido ',
      filter: true,
      APIReturnable: true,
      required: true,
      modal: {
        veeValidate: 'min:10|max:11|numeric',
        cssIcon: 'fa fa-envelope',
        responsiveCSS: 'column is-3'
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
