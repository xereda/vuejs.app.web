<template lang="html">
  <div id="modal" :class="{ 'modal': true, 'is-active': control, 'animated': true, 'fadeIn': fadeIn, 'fadeOut': fadeOut }">
    <div class="modal-background"></div>
    <div class="modal-card custom">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="modalClose()"></button>
      </header>
      <section class="modal-card-body">
        <form>
          <div class="columns is-multiline">
            <div :class="col.modal.responsiveCSS" v-if="validColumn(col, index)" v-for="(col, index) in collection">

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
                <i v-if="isSimpleInputType(col.type)" :class="col.modal.cssIcon"></i>
                <span v-if="isSimpleInputType(col.type)" class="help is-danger">{{ errors.first(index) }}&nbsp;</span>
              </p>

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
        </form>
        <dm-modal-audit :last-doc-update-date="getLastDocUpdateDate()" :document-id="documentId" v-if="isUpdateDocument() "></dm-modal-audit>
      </section>
      <footer class="modal-card-foot">
        <a :class="getCSSButtonSave" @click="formSubmit()">Salvar</a>
        <a class="button" @click="modalClose()">Cancelar</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import _ from 'lodash'
import topbar from 'topbar'
import dmModalAudit from './auditInfo.vue'
import 'animate.css/animate.min.css'
import showMessage from '../../../utils/message'

const SIMPLE_INPUT_TYPES = [ 'text', 'email', 'password', 'date' ]

export default {
  data () {
    return {
      modelo: 'opa la',
      isLoading: false,
      fadeIn: true,
      fadeOut: false,
      modalDoc: {
      }
    }
  },
  mounted () {
    // topbar.config(this.topbarConfig)
    // topbar.show()
    this.$validator.setLocale('pt_BR')
    this.isUpdateDocument() === true ? this.getDoc() : null
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      API: state => {
        const { API } = state.users
        return API
      },
      collection: state => {
        const { collection } = state.users
        return collection
      },
      general: state => {
        const { general } = state.users
        return general
      },
      session: state => {
        const { user } = state
        return user
      }
    }),
    title () {
      return (this.isUpdateDocument()) ? this.general.modal.titleUpdateDocument : this.general.modal.titleNewDocument
    },
    getCSSButtonSave () {
      if ((this.errors.any() === true) || (this.isLoading === true)) {
        return 'button is-info is-disabled'
      }
      return 'button is-info'
    }
  },
  methods: {
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
      this.isLoading = true
      topbar.show()
    },
    stopLoading (delay) {
      if (delay > 0) {
        setTimeout(() => {
          this.isLoading = false
          topbar.hide()
        }, delay)
      } else {
        this.isLoading = false
        topbar.hide()
      }
    },
    isLoading () {
      return this.isLoading
    },
    getDoc () {
      this.startLoading()
      const _uri = this.config.APIURIBase + this.API.resource + '/' + this.documentId

      this.$http.get(_uri).then((response) => {
        // get status
        console.log(response.status)
        // get status text
        console.log(response.statusText)
        this.modalDoc = response.body
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
        // get status
        console.log(response.status)
        // get status text
        console.log(response.statusText)
        this.showUserNotifications(response, 'createDoc', 'success')
        this.$emit('set-pag', 1)
        this.stopLoading(0)
      }, (response) => {
        this.showUserNotifications(response, 'createdDoc', 'error')
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    updateDoc () {
      this.startLoading()
      this.modalDoc.updatedById = this.session._id
      const _uri = this.config.APIURIBase + this.API.resource

      console.log('vai atualizar isso aqui: ', this.modalDoc)

      this.$http.put(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        // get status
        console.log(response.status)
        // get status text
        console.log(response.statusText)
        response.body.updatedAt !== undefined ? this.modalDoc.updatedAt = response.body.updatedAt : null
        this.showUserNotifications(response, 'updateDoc', 'success')
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
      console.log('mudou o id: ', val)
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
