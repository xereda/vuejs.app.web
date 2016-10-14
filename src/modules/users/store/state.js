export default {
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
      required: true,
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
      required: true,
      table: {
        header: {
          visible: true,
          class: 'is-hidden-mobile'
        }
      }

    },
    admin: {
      type: 'boolean',
      label: 'Admin',
      filter: true,
      APIReturnable: true,
      required: true,
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
  sort: [ 'name', 'email' ]
}
