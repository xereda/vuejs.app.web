export default {
  general: {
    title: 'Usuários',
    subTitle: 'cadastro de usuários',
    modal: {
      titleNewDocument: 'Novo usuário',
      titleUpdateDocument: 'Alterando usuário'
    }
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
        responsiveCSS: 'column is-6'
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
      placeHolder: 'Informe a senha do usuário',
      error: 'Informe uma senha válida',
      required: true,
      modal: {
        veeValidate: 'confirmed:password2|min:5',
        cssIcon: 'fa fa-lock',
        responsiveCSS: 'column is-6'
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
        responsiveCSS: 'column is-6'
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
    },
    line1: {
      modal: {
        responsiveCSS: 'column is-8'
      }
    },
    createdAt: {
      type: 'date',
      label: 'Criado em',
      APIReturnable: true,
      modal: {
        cssIcon: 'fa fa-calendar',
        responsiveCSS: 'column is-6'
      },
      table: {
        header: {
          visible: true,
          class: 'is-hidden-touch'
        }
      }
    },
    createdById: {
      type: 'objectId'
    },
    updatedById: {
      type: 'objectId'
    }
  },
  filters: {
    search: {
      text: '',
      fieldName: '',
      state: ''
    },
    boolean: []
  },
  sort: [
    { field: 'name', sort: 'asc' }
  ]
}
