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
      veeValidate: 'alpha|min:3',
      cssIcon: 'fa fa-user',
      cssResponsiveModal: 'column is-6',
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
      veeValidate: 'email',
      cssIcon: 'fa fa-envelope',
      cssResponsiveModal: 'column is-6',
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
      veeValidate: 'confirmed:password2',
      cssIcon: 'fa fa-lock',
      cssResponsiveModal: 'column is-6'
    },
    password2: {
      type: 'password',
      label: 'Repita a senha',
      placeHolder: 'Repita a senha',
      error: 'Repita a senha corretamente',
      required: true,
      cssIcon: 'fa fa-lock',
      cssResponsiveModal: 'column is-6'
    },
    admin: {
      type: 'boolean',
      label: 'Admin',
      filter: true,
      APIReturnable: true,
      required: true,
      cssResponsiveModal: 'column is-2',
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
      cssResponsiveModal: 'column is-2',
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
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
