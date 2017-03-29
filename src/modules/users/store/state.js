export default {
  general: {
    title: 'Usuários',
    subTitle: 'cadastro de usuários',
    modal: {
      titleNewDocument: 'Novo usuário',
      titleUpdateDocument: 'Alterando usuário'
    }
  },
  API: {
    resource: 'users',
    mutationPrefix: 'USERS'
  },
  collection: {
    _id: {
      type: 'objectId',
      APIReturnable: true
    },
    name: {
      type: 'text',
      label: 'Nome',
      placeHolder: 'Informe o nome completo',
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
      placeHolder: 'Informe o e-mail do usuário',
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
    // __space1__: {
    //   modal: {
    //     responsiveCSS: 'column is-2'
    //   }
    // },
    password: {
      type: 'password',
      label: 'Senha',
      placeHolder: 'Informe a senha do usuário',
      error: 'Informe uma senha válida',
      required: true,
      modal: {
        veeValidate: 'confirmed:password2|min:3',
        cssIcon: 'fa fa-lock',
        responsiveCSS: 'column is-6',
        hiddenOnUpdate: false
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
        responsiveCSS: 'column is-6',
        hiddenOnUpdate: false
      }
    },
    admin: {
      type: 'boolean',
      label: 'Admin',
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
