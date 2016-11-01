<template lang="html">
  <div id="modal" :class="{ 'modal': true, 'is-active': control, 'animated': true, 'fadeIn': fadeIn, 'fadeOut': fadeOut }">
    <div class="modal-background"></div>
    <div class="modal-card custom">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="confirmeModalClose()"></button>
      </header>
      <section class="modal-card-body">
        <div class="tabs is-boxed">
          <ul>
            <li class="is-active">
              <a>
                <span class="icon is-small"><i class="fa fa-info-circle"></i></span>
                <span>Geral</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon is-small"><i class="fa fa-link"></i></span>
                <span>Relações</span>
              </a>
            </li>
          </ul>
        </div>
        <form>
          <div class="columns is-multiline">
            <div :class="col.modal.responsiveCSS" v-if="validColumn(col, index)" v-for="(col, index) in collection">

              <div v-if="col.type !== 'geo'">
                <label class="label" v-if="showTopLabel(col.type)">{{ col.label }}</label>
                <p class="control has-icon">
                  <input v-if="[ 'text', 'date' ].indexOf(col.type) > -1"
                         v-model="modalDoc[index]"
                         v-validate
                         :data-rules="getDataRules(col)"
                         :data-as="col.label"
                         :data-delay="config.delayApplyRule"
                         :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(index) }"
                         :name="index"
                         type="text"
                         :placeholder="col.placeHolder">
                  <input v-if="col.type === 'email'"
                         v-model="modalDoc[index]"
                         v-validate
                         :data-rules="getDataRules(col)"
                         :data-as="col.label"
                         :data-delay="config.delayApplyRule"
                         :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(index) }"
                         :name="index"
                         type="email"
                         :placeholder="col.placeHolder">
                  <input v-if="col.type === 'password'"
                         v-model="modalDoc[index]"
                         v-validate
                         :data-rules="getDataRules(col)"
                         :data-as="col.label"
                         :data-delay="config.delayApplyRule"
                         :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(index) }"
                         :name="index"
                         type="password"
                         :placeholder="col.placeHolder">
                </p>
              </div>

              <div v-if="col.type === 'geo'">
                <div class="columns">
                  <div class="column">
                    <label class="label" v-if="showTopLabel(col.type)">{{ col.geoDefinitions.long.label }}</label>
                    <p class="control has-icon">
                      <input v-model="modalDoc[index].coordinates[0]"
                             v-validate
                             :data-rules="getDataRules(col)"
                             :data-as="col.geoDefinitions.long.label"
                             :data-delay="config.delayApplyRule"
                             :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(col.geoDefinitions.long.name) }"
                             :name="col.geoDefinitions.long.name"
                             type="number"
                             step="any"
                             :placeholder="col.geoDefinitions.long.placeHolder">
                      <i v-if="isSimpleInputType(col.type)" :class="col.modal.cssIcon"></i>
                      <span v-if="isSimpleInputType(col.type)" class="help is-danger">{{ errors.first(col.geoDefinitions.long.name) }}&nbsp;</span>
                    </p>
                  </div>
                  <div class="column">
                    <label class="label" v-if="showTopLabel(col.type)">{{ col.geoDefinitions.lat.label }}</label>
                    <p class="control has-icon">
                      <input v-model="modalDoc[index].coordinates[1]"
                             v-validate
                             :data-rules="getDataRules(col)"
                             :data-as="col.geoDefinitions.lat.label"
                             :data-delay="config.delayApplyRule"
                             :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(col.geoDefinitions.lat.name) }"
                             :name="col.geoDefinitions.lat.name"
                             type="number"
                             step="any"
                             :placeholder="col.geoDefinitions.lat.placeHolder">
                      <i v-if="isSimpleInputType(col.type)" :class="col.modal.cssIcon"></i>
                      <span v-if="isSimpleInputType(col.type)" class="help is-danger">{{ errors.first(col.geoDefinitions.lat.name) }}&nbsp;</span>
                    </p>
                  </div>
                </div>
              </div>

              <p class="control" v-if="col.type === 'boolean'">
                <label class="checkbox">
                  <input type="checkbox"
                         :class="{ 'checkbox': true, 'is-disabled': isReadOnlyOnUpdate(col) }"
                         v-model="modalDoc[index]">
                  {{ col.label }}
                </label>
              </p>

            </div>
          </div>

          modalDOC: {{ modalDoc }}
          <hr>
          clonedDoc: {{ clonedDoc  }}

          <hr>

          anyOtherFieldDoc: {{ anyOtherFieldDoc }}

        </form>
        <dm-modal-audit :mutation-prefix="API.mutationPrefix" :resource="API.resource" :last-doc-update-date="getLastDocUpdateDate()" :document-id="documentId" v-if="isUpdateDocument() "></dm-modal-audit>
      </section>
      <footer class="modal-card-foot">

        <a :class="getCSSButtonSave" @click="formSubmit()">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
          <span>Salvar</span>
        </a>

        <a :class="'button'" @click="confirmeModalClose()">
          <span class="icon is-small">
            <i class="fa fa-ban"></i>
          </span>
          <span>Cancelar</span>
        </a>

        <a :class="'button is-danger'" v-if="isUpdateDocument()" @click="removeDocument()">
          <span class="icon is-small">
            <i class="fa fa-trash"></i>
          </span>
          <span>Excluir</span>
        </a>

      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
import topbar from 'topbar'
import dmModalAudit from '../../ui/auditInfo.vue'
import 'animate.css/animate.min.css'
import showMessage from '../../ui/message/message'

const SIMPLE_INPUT_TYPES = [ 'text', 'email', 'password', 'date', 'geo' ]

export default {
  data () {
    return {
      modelo: 'opa la',
      loading: false,
      fadeIn: true,
      fadeOut: false,
      modalDoc: {
        geoLocation: {
          coordinates: [],
          type: 'Point'
        }
      },
      clonedDoc: {
        geoLocation: {
          coordinates: [],
          type: 'Point'
        }
      },
      anyOtherFieldDoc: {
        geoLocation: {
          coordinates: [],
          type: 'Point'
        }
      }
    }
  },
  mounted () {
    // topbar.config(this.topbarConfig)
    // topbar.show()
    this.$validator.setLocale('pt_BR')
    this.isUpdateDocument() === true ? this.getDoc() : null
    this.clonedDoc = { geoLocation: { coordinates: [], type: 'Point' } }
    this.anyOtherFieldDoc = _.clone(this.clonedDoc)
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      API: state => {
        const { API } = state.cities
        return API
      },
      collection: state => {
        const { collection } = state.cities
        return collection
      },
      general: state => {
        const { general } = state.cities
        return general
      },
      session: state => {
        const { user } = state
        return user
      },
      ux: state => {
        const { ux } = state.cities
        return ux
      }
    }),
    title () {
      return (this.isUpdateDocument()) ? this.general.modal.titleUpdateDocument : this.general.modal.titleNewDocument
    },
    getCSSButtonSave: {
      cache: false,
      get () {
        // console.log('this.isPristine(): ', this.isPristine())
        // console.log('this.errors.any(): ', this.errors.any())
        // console.log('this.isLoading(): ', this.isLoading())
        if ((this.isPristine()) || (this.errors.any() === true) || (this.isLoading())) {
          return 'button is-info is-disabled'
        }
        return 'button is-info'
      }
    }
  },
  methods: {
    ...mapActions([]),
    isPristine () {
      return !this.changedModalDoc()
    },
    isDirty () {
      return this.changedModalDoc()
    },
    changedModalDoc () {
      return !_.isEqual(this.clonedDoc, this.modalDoc)
    },
    isReadOnlyOnUpdate (col) {
      return col.modal.readOnlyOnUpdate && this.isUpdateDocument()
    },
    isHiddenOnUpdate (col) {
      return col.modal.hiddenOnUpdate && this.isUpdateDocument()
    },
    getModalState () {
      return this.modalState
    },
    isUpdateDocument () {
      return this.getModalState() === 'update'
    },
    getLastDocUpdateDate () {
      return this.modalDoc.updatedAt
    },
    showAlerts (obj) {
      showMessage({
        title: obj.title,
        message: obj.message,
        duration: obj.duration,
        showCloseButton: obj.showCloseButton,
        type: obj.type
      })
    },
    startLoading () {
      this.loading = true
      topbar.show()
    },
    stopLoading (delay) {
      if (delay > 0) {
        setTimeout(() => {
          this.loading = false
          topbar.hide()
        }, delay)
      } else {
        this.loading = false
        topbar.hide()
      }
    },
    isLoading () {
      return this.loading
    },
    removeDocument () {
      this.$emit('remove-document', { documentId: this.modalDoc._id, documentIdentify: this.modalDoc.name })
    },
    getDoc () {
      this.startLoading()
      const _uri = this.config.APIURIBase + this.API.resource + '/' + this.documentId

      this.$http.get(_uri).then((response) => {
        this.modalDoc = response.body
        this.clonedDoc = _.clone(this.modalDoc)
        this.stopLoading(0)
      }, (response) => {
        this.showUserNotifications(response, 'getDoc', 'error')
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    createDoc () {
      this.startLoading()
      this.modalDoc.createdById = this.session._id
      const _uri = this.config.APIURIBase + this.API.resource

      this.$http.post(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        this.showUserNotifications(response, 'createDoc', 'success')
        this.$emit('set-pag', 1)
        this.stopLoading(0)
        this.modalDoc = { geoLocation: { coordinates: [], type: 'Point' } }
      }, (response) => {
        this.showUserNotifications(response, 'createDoc', 'error')
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    updateDoc () {
      this.startLoading()
      this.modalDoc.updatedById = this.session._id
      const _uri = this.config.APIURIBase + this.API.resource

      this.$http.put(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        response.body.updatedAt !== undefined ? this.modalDoc.updatedAt = response.body.updatedAt : null
        this.showUserNotifications(response, 'updateDoc', 'success')
        this.clonedDoc = _.clone(this.modalDoc)
        this.$emit('set-pag')
        this.stopLoading(500)
      }, (response) => {
        this.showUserNotifications(response, 'updateDoc', 'error')
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    formSubmit () {
      this.$validator.validateAll()
      if (this.errors.any() === false) {
        if (this.isUpdateDocument()) {
          this.updateDoc()
        } else {
          this.createDoc()
        }
      }
    },
    showUserNotifications (res, action, status) {
      const _obj = {
        title: '',
        message: '',
        duration: this.config.modal.messagePresentationTime,
        showCloseButton: true,
        type: 'danger'
      }

      switch (action) {
        case 'getDoc':
          _obj.title = 'Erro buscando documento'
          _obj.message = 'Não foi possível atualizar as informações do documento.'
          break
        case 'createDoc':
          if (status === 'success') {
            _obj.title = 'Ok'
            _obj.message = 'O documento foi criado com sucesso!'
            _obj.type = 'primary'
          } else {
            _obj.title = 'Erro inserindo documento'
          }
          break
        case 'updateDoc':
          if (status === 'success') {
            _obj.title = 'Ok'
            _obj.message = 'Documento atualizado com sucesso'
            _obj.type = 'primary'
          } else {
            _obj.title = 'Erro atualizando documento'
          }
          break
        default:
          null
      }

      if (status === 'error') {
        if (res.status === 0) {
          _obj.message += 'Erro de conexão a API DocMob'
        } else if (res.status === 503) {
          _obj.title = res.data.error
          _obj.message = res.statusText
        } else if (res.data.err.errors !== undefined) {
          Object.keys(res.data.err.errors).forEach((element, index) => {
            _obj.message += res.data.err.errors[element].message + '<br />'
          })
        } else {
          _obj.message += res.data.err.errmsg
        }
      }
      this.showAlerts(_obj)
    },
    getDataRules (col) {
      if ((col.required === true) && (col.modal.veeValidate !== undefined)) {
        return 'required|' + col.modal.veeValidate
      } else if (col.required === true) {
        return 'required'
      } else if (col.modal.veeValidate !== undefined) {
        return col.modal.veeValidate
      } else {
        return 'ignore'
      }
    },
    isSimpleInputType (type) {
      if (SIMPLE_INPUT_TYPES.indexOf(type) > -1) {
        return true
      }
      return false
    },
    showTopLabel (type) {
      if (this.isSimpleInputType(type)) {
        return true
      }
      return false
    },
    validColumn (col, name) {
      if ([ '_id', 'createdById', 'updatedById' ].indexOf(name) > -1) {
        return false
      } else if (this.isHiddenOnUpdate(col)) {
        return false
      }
      return true
    },
    confirmeModalClose () {
      const self = this
      if (this.isDirty()) {
        swal({ title: 'Deseja sair?',
        text: 'Existem informações não salvas no formulário. \n Deseja realmente sair sem salvar?',
        type: 'warning',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Sim, desejo sair!',
        cancelButtonText: 'Voltar',
        closeOnConfirm: true },
        () => setTimeout(() => self.modalClose()))
      } else {
        this.modalClose()
      }
    },
    modalClose () {
      this.fadeOut = true
      const self = this
      setTimeout(function () {
        self.fadeOut = false
        self.fadeIn = true
        self.$emit('close-modal')
      }, 510)
    }
  },
  components: {
    dmModalAudit
  },
  watch: {
    documentId (val) {
      this.errors.clear()
    }
  },
  props: [
    'control',
    'documentId',
    'modalState'
  ]
}
</script>

<style lang="scss" scoped>
@import '../../../scss/config.scss';

#modal {
  animation-duration: $fadeModal;
}
.custom {
  width: 80% !important;
}

</style>
