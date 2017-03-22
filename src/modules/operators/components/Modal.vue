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
                <span class="icon"><i class="fa fa-info-circle"></i></span>
                <span>Geral</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon"><i class="fa fa-link"></i></span>
                <span>Relações</span>
              </a>
            </li>
          </ul>
        </div>
        <form>
          <div class="columns is-multiline">
            <div :class="collection['name'].modal.responsiveCSS">
              <label class="label">{{ collection['name'].label }}</label>
              <p class="control has-icon">
                <input v-model="modalDoc.name"
                       v-validate
                       :data-vv-rules="getDataRules(collection['name'])"
                       :data-vv-as="collection['name'].label"
                       :data-vv-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(collection['name']), 'is-danger': errors.has('name') }"
                       name="name"
                       type="text"
                       :placeholder="collection['name'].placeHolder">
                 <span class="icon is-small">
                   <i :class="collection['name'].modal.cssIcon"></i>
                 </span>
                <span class="help is-danger">{{ errors.first('name') }}&nbsp;</span>
              </p>
            </div>
            <div :class="collection['agreement'].modal.responsiveCSS">
              <label class="label">{{ collection['agreement'].label }}</label>
              <p class="control has-icon">
                <!-- <input v-model="modalDoc.agreement"
                       v-validate
                       :data-vv-rules="getDataRules(collection['agreement'])"
                       :data-vv-as="collection['agreement'].label"
                       :data-vv-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(collection['agreement']), 'is-danger': errors.has('agreement') }"
                       name="agreement"
                       type="text"
                       :placeholder="collection['agreement'].placeHolder"> -->
                 <input v-model="modalDoc.agreement"
                        v-validate
                        :data-vv-rules="getDataRules(collection['agreement'])"
                        :data-vv-as="collection['agreement'].label"
                        name="agreement"
                        class="is-hidden"
                        type="text">

                 <multiselect
                   :value="vueSelect.Agreements.selectedObject"
                   :options="vueSelect.Agreements.list"
                   select-label="[enter] para selecionar"
                   selected-label="selecionado"
                   deselect-label="[enter] para remover"
                   placeholder="Selecione um convênio"
                   :loading="vueSelect.Agreements.isLoading"
                   :local-search="false"
                   @search-change="vueSelectAsyncFind"
                   :searchable="true"
                   track-by="_id"
                   label="name"
                   class="vueSelect"
                   @input="vueSelectUpdateSelected">
                 </multiselect>

                 <span class="icon is-small">
                   <i :class="collection['agreement'].modal.cssIcon"></i>
                 </span>
                <span class="help is-danger" v-if="modalDoc.agreement === ''">{{ errors.first('agreement') }}&nbsp;</span>
                <span class="help is-danger" v-else>&nbsp;</span>


              </p>
            </div>
            <div :class="collection['ANSCode'].modal.responsiveCSS">
              <label class="label">{{ collection['ANSCode'].label }}</label>
              <p class="control has-icon">
                <input v-model="modalDoc.ANSCode"
                       v-validate
                       :data-vv-rules="getDataRules(collection['ANSCode'])"
                       :data-vv-as="collection['ANSCode'].label"
                       :data-vv-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(collection['ANSCode']), 'is-danger': errors.has('ANSCode') }"
                       name="ANSCode"
                       type="text"
                       :placeholder="collection['ANSCode'].placeHolder">
                <span class="icon is-small">
                  <i :class="collection['ANSCode'].modal.cssIcon"></i>
                </span>
                <span class="help is-danger">{{ errors.first('ANSCode') }}&nbsp;</span>
              </p>
            </div>
            <div :class="collection['internalCode'].modal.responsiveCSS">
              <label class="label">{{ collection['internalCode'].label }}</label>
              <p class="control has-icon">
                <input v-model="modalDoc.internalCode"
                       v-validate
                       :data-vv-rules="getDataRules(collection['internalCode'])"
                       :data-vv-as="collection['internalCode'].label"
                       :data-vv-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(collection['internalCode']), 'is-danger': errors.has('internalCode') }"
                       name="internalCode"
                       type="text"
                       :placeholder="collection['internalCode'].placeHolder">
                <span class="icon is-small">
                  <i :class="collection['internalCode'].modal.cssIcon"></i>
                </span>
                <span class="help is-danger">{{ errors.first('internalCode') }}&nbsp;</span>
              </p>
            </div>
            <div :class="collection['webService.uri'].modal.responsiveCSS">
              <label class="label">{{ collection['webService.uri'].label }}</label>
              <p class="control has-icon">
                <input v-model="modalDoc.webService.uri"
                       v-validate
                       :data-vv-rules="getDataRules(collection['webService.uri'])"
                       :data-vv-as="collection['webService.uri'].label"
                       :data-vv-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(collection['webService.uri']), 'is-danger': errors.has('webService_uri') }"
                       name="webService_uri"
                       type="text"
                       :placeholder="collection['webService.uri'].placeHolder">
                 <span class="icon is-small">
                   <i :class="collection['webService.uri'].modal.cssIcon"></i>
                 </span>
                <span class="help is-danger">{{ errors.first('webService_uri') }}&nbsp;</span>
              </p>
            </div>
            <div :class="collection['webService.user'].modal.responsiveCSS">
              <label class="label">{{ collection['webService.user'].label }}</label>
              <p class="control has-icon">
                <input v-model="modalDoc.webService.user"
                       v-validate
                       :data-vv-rules="getDataRules(collection['webService.user'])"
                       :data-vv-as="collection['webService.user'].label"
                       :data-vv-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(collection['webService.user']), 'is-danger': errors.has('webService_user') }"
                       name="webService_user"
                       type="text"
                       :placeholder="collection['webService.user'].placeHolder">
                <span class="icon is-small">
                  <i :class="collection['webService.user'].modal.cssIcon"></i>
                </span>
                <span class="help is-danger">{{ errors.first('webService_user') }}&nbsp;</span>
              </p>
            </div>
            <div :class="collection['webService.password'].modal.responsiveCSS">
              <label class="label">{{ collection['webService.password'].label }}</label>
              <p class="control has-icon">
                <input v-model="modalDoc.webService.password"
                       v-validate
                       :data-vv-rules="getDataRules(collection['webService.password'])"
                       :data-vv-as="collection['webService.password'].label"
                       :data-vv-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(collection['webService.password']), 'is-danger': errors.has('webService_password') }"
                       name="webService_password"
                       type="password"
                       :placeholder="collection['webService.password'].placeHolder">
                <span class="icon is-small">
                  <i :class="collection['webService.password'].modal.cssIcon"></i>
                </span>
                <span class="help is-danger">{{ errors.first('webService_password') }}&nbsp;</span>
              </p>
            </div>
            <div :class="collection['active'].modal.responsiveCSS">
              <label class="checkbox">
                <input type="checkbox"
                       :class="{ 'checkbox': true, 'is-disabled': isReadOnlyOnUpdate(collection['active']) }"
                       v-model="modalDoc.active">
                {{ collection['active'].label }}
              </label>
            </div>
          </div>
          <!-- modalDoc: {{ modalDoc }}
          <hr>
          clonedDoc: {{ clonedDoc }}
          <hr>
          modelFactory: {{ modelFactory }}
          <hr>
          vueSelect: {{ vueSelect }} -->
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
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
import topbar from 'topbar'
import dmModalAudit from '../../../utils/ui/AuditInfo.vue'
import 'animate.css/animate.min.css'
import Multiselect from 'vue-multiselect'
import { showAPIErrors, showAPISuccess } from '../../../utils/services/messenger/main'

const SIMPLE_INPUT_TYPES = [ 'text', 'email', 'password', 'date', 'geo' ]

export default {
  data () {
    return {
      vueSelect: {
        Agreements: {
          isLoading: false,
          selectedObject: null,
          list: []
        }
      },
      loading: false,
      fadeIn: true,
      fadeOut: false,
      modalDoc: {
      },
      clonedDoc: {
      }
    }
  },
  created () {
    this.$set(this, 'modalDoc', JSON.parse(JSON.stringify(this.modelFactory)))
    this.$set(this, 'clonedDoc', JSON.parse(JSON.stringify(this.modelFactory)))
  },
  mounted () {
    this.vueSelectAsyncFind('')
    this.$validator.setLocale('pt_BR')
    this.isUpdateDocument() === true ? this.getDoc() : null
  },
  computed: {
    ...mapState({
      modelFactory: state => {
        const { collection } = state.operators
        const _model = {}
        Object.keys(collection).forEach((element, index) => {
          if (collection[element].parentObject !== undefined) {
            const _objTemp = {}
            if (collection[element].type === 'boolean') {
              _objTemp[collection[element].parentObject.propertieName] = false
            } else {
              _objTemp[collection[element].parentObject.propertieName] = ''
            }
            _model[collection[element].parentObject.objectName] = _.assign(_model[collection[element].parentObject.objectName], _objTemp)
          } else {
            if (collection[element].type === 'boolean') {
              _model[element] = false
            } else if (collection[element].type === 'geo') {
              _model[element] = {
                coordinates: [
                  '',
                  ''
                ],
                type: 'Point'
              }
            } else {
              _model[element] = ''
            }
          }
        })
        return _model
      },
      config: state => {
        const { config } = state
        return config
      },
      API: state => {
        const { API } = state.operators
        return API
      },
      collection: state => {
        const { collection } = state.operators
        return collection
      },
      general: state => {
        const { general } = state.operators
        return general
      },
      session: state => {
        const { user } = state
        return user
      },
      ux: state => {
        const { ux } = state.operators
        return ux
      }
    }),
    title () {
      return (this.isUpdateDocument()) ? this.general.modal.titleUpdateDocument : this.general.modal.titleNewDocument
    },
    getCSSButtonSave: {
      cache: false,
      get () {
        if ((this.isPristine()) || (this.errors.any() === true) || (this.isLoading())) {
          return 'button is-info is-disabled'
        }
        return 'button is-info'
      }
    }
  },
  methods: {
    ...mapActions([]),
    vueSelectUpdateSelected (newSelected) {
      this.vueSelect.Agreements.selectedObject = newSelected
    },
    vueSelectAsyncFind (query) {
      query !== '' ? query = '&name=/' + query + '/i' : null
      this.vueSelect.Agreements.isLoading = true
      console.log(query)
      const _uri = this.config.APIURIBase + 'agreements/?_fields=name' + query
      console.log('_uri: ', _uri)
      this.$http.get(_uri).then((response) => {
        this.vueSelect.Agreements.list = response.body
        this.vueSelect.Agreements.isLoading = false
      }, (response) => {
        console.log('deu erro no select: ', response)
        this.vueSelect.Agreements.isLoading = false
      })
    },
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
      const _uri = this.config.APIURIBase + this.API.resource + '/' + this.documentId + '/?_populate=agreement'
      this.$http.get(_uri).then((response) => {
        this.modalDoc = response.body
        console.log('modalDoc: ', JSON.stringify(response.body))
        const _selectedObjectAgreements = {
          _id: response.body.agreement._id,
          name: response.body.agreement.name
        }
        this.$set(this.vueSelect.Agreements, 'selectedObject', _selectedObjectAgreements)
        this.$set(this.modalDoc, 'agreement', response.body.agreement._id)
        this.$set(this, 'clonedDoc', JSON.parse(JSON.stringify(this.modalDoc)))
        this.stopLoading(0)
      }, (response) => {
        showAPIErrors(response)
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    createDoc () {
      this.startLoading()
      this.modalDoc.createdById = this.session._id
      const _uri = this.config.APIURIBase + this.API.resource

      this.$http.post(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        showAPISuccess({ title: 'OK', message: 'Operadora cadastrada com sucesso!' })
        this.$emit('set-pag', 1)
        this.$set(this, 'clonedDoc', JSON.parse(JSON.stringify(this.modelFactory)))
        this.$set(this, 'modalDoc', JSON.parse(JSON.stringify(this.modelFactory)))
        this.vueSelect.Agreements.selectedObject = null
        this.stopLoading(0)
      }, (response) => {
        showAPIErrors(response)
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    updateDoc () {
      this.startLoading()
      this.modalDoc.updatedById = this.session._id
      const _uri = this.config.APIURIBase + this.API.resource

      console.log('modalDoc: ', this.modalDoc)

      this.$http.put(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        response.body.updatedAt !== undefined ? this.modalDoc.updatedAt = response.body.updatedAt : null
        showAPISuccess({ title: 'OK', message: 'Operadora alterada com sucesso!' })
        this.$set(this, 'clonedDoc', JSON.parse(JSON.stringify(this.modalDoc)))
        this.$emit('set-pag')
        this.stopLoading(500)
      }, (response) => {
        showAPIErrors(response)
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    formSubmit () {
      this.$validator.validateAll().then(() => {
        // success stuff
      }).catch(() => {
        // fail stuff
      })

      if (this.errors.any() === false) {
        if (this.isUpdateDocument()) {
          this.updateDoc()
        } else {
          this.createDoc()
        }
      }
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
    dmModalAudit,
    Multiselect
  },
  watch: {
    documentId (val) {
      this.errors.clear()
    },
    'modalDoc.geoLocation.type': {
      handler (val, oldVal) {
      },
      deep: true
    },
    'vueSelect.Agreements.selectedObject': {
      deep: true,
      handler (val, oldVal) {
        console.log('oldVal: ', oldVal)
        console.log('val: ', val)
        val === null ? this.$set(this.modalDoc, 'agreement', '') : this.$set(this.modalDoc, 'agreement', val._id)
      }
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
