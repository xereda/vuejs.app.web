export default {
  collection: {
    _id: { type: 'objectId' },
    name: {
      type: 'text',
      label: 'Nome',
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
  }
}
