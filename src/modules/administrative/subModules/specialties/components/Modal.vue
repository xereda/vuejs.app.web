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
            <div :class="collection['registrationCode'].modal.responsiveCSS">
              <label class="label">{{ collection['registrationCode'].label }}</label>
              <p class="control has-icon">
                <input v-model="modalDoc.registrationCode"
                       v-validate
                       :data-vv-rules="getDataRules(collection['registrationCode'])"
                       :data-vv-as="collection['registrationCode'].label"
                       :data-vv-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(collection['registrationCode']), 'is-danger': errors.has('registrationCode') }"
                       name="registrationCode"
                       type="text"
                       :placeholder="collection['registrationCode'].placeHolder">
                <span class="icon is-small">
                  <i :class="collection['registrationCode'].modal.cssIcon"></i>
                </span>
                <span class="help is-danger">{{ errors.first('registrationCode') }}&nbsp;</span>
              </p>
            </div>
            <div :class="collection['professionalActivity'].modal.responsiveCSS">
              <label class="label">{{ collection['professionalActivity'].label }}</label>
              <p class="control has-icon">


                 <input v-model="modalDoc.professionalActivity"
                        v-validate
                        :data-vv-rules="getDataRules(collection['professionalActivity'])"
                        :data-vv-as="collection['professionalActivity'].label"
                        name="professionalActivity"
                        class="is-hidden"
                        type="text">

                 <multiselect
                   :value="vueSelect.PA.selectedObject"
                   :options="vueSelect.PA.list"
                   select-label="[enter] para selecionar"
                   selected-label="selecionado"
                   deselect-label="[enter] para remover"
                   placeholder="Selecione um ramo de atividade"
                   :loading="vueSelect.PA.isLoading"
                   :local-search="false"
                   @search-change="vueSelectAsyncFind"
                   :searchable="true"
                   track-by="_id"
                   label="name"
                   @input="vueSelectUpdateSelected">
                 </multiselect>

                 <span class="icon is-small">
                   <i :class="collection['professionalActivity'].modal.cssIcon"></i>
                 </span>
                <span class="help is-danger" v-if="modalDoc.professionalActivity === ''">{{ errors.first('professionalActivity') }}&nbsp;</span>
                <span class="help is-danger" v-else>&nbsp;</span>


              </p>
            </div>
            <div :class="collection['active'].modal.responsiveCSS">
              <label class="label is-hidden-mobile">&nbsp;</label>
              <label class="checkbox">
                <input type="checkbox"
                       :class="{ 'checkbox': true, 'is-disabled': isReadOnlyOnUpdate(collection['active']) }"
                       v-model="modalDoc.active">
                {{ collection['active'].label }}
              </label>
            </div>
          </div>
        </form>
        <dm-modal-audit :mutation-prefix="API.mutationPrefix" :resource="API.resource" :last-doc-update-date="getLastDocUpdateDate()" :document-id="documentId" v-if="isUpdateDocument() "></dm-modal-audit>
      </section>
      <footer class="modal-card-foot">
        <div class="is-hidden-mobile">
          <a :class="getCSSButtonSave" @click="formSubmit()">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
            <span>Salvar</span>
          </a>
          <a :class="'button'" @click="confirmeModalClose()">
            <span class="icon is-small">
              <i class="fa fa-sign-out"></i>
            </span>
            <span>Cancelar</span>
          </a>
          <a :class="'button is-danger'" v-if="isUpdateDocument()" @click="removeDocument()">
            <span class="icon is-small">
              <i class="fa fa-trash"></i>
            </span>
            <span>Excluir</span>
          </a>
        </div>
        <div class="is-hidden-tablet">
          <a :class="getCSSButtonSave" @click="formSubmit()">
            <span class="icon is-small">
              <i class="fa fa-check"></i>
            </span>
            <span>Salvar</span>
          </a>
          <a :class="'button'" @click="confirmeModalClose()">
            <span class="icon is-small">
              <i class="fa fa-sign-out"></i>
            </span>
          </a>
          <a :class="'button is-danger'" v-if="isUpdateDocument()" @click="removeDocument()">
            <span class="icon is-small">
              <i class="fa fa-trash"></i>
            </span>
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'
import topbar from 'topbar'
import dmModalAudit from 'utils/ui/AuditInfo.vue'
import 'animate.css/animate.min.css'
import Multiselect from 'vue-multiselect'
import { showAPIErrors, showAPISuccess } from 'utils/services/messenger/main'

const SIMPLE_INPUT_TYPES = [ 'text', 'email', 'password', 'date', 'geo' ]

export default {
  data () {
    return {
      vueSelect: {
        PA: {
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
        const { collection } = state.specialties
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
        const { API } = state.specialties
        return API
      },
      collection: state => {
        const { collection } = state.specialties
        return collection
      },
      general: state => {
        const { general } = state.specialties
        return general
      },
      session: state => {
        const { user } = state
        return user
      },
      ux: state => {
        const { ux } = state.specialties
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
      this.vueSelect.PA.selectedObject = newSelected
    },
    vueSelectAsyncFind (query) {
      query !== '' ? query = '&name=/' + query + '/i' : null
      this.vueSelect.PA.isLoading = true
      console.log(query)
      const _uri = this.config.APIURIBase + 'professionalActivities/?_fields=name' + query + '&active=true'
      console.log('_uri: ', _uri)
      this.$http.get(_uri).then((response) => {
        this.vueSelect.PA.list = response.body
        this.vueSelect.PA.isLoading = false
      }, (response) => {
        console.log('deu erro no select: ', response)
        this.vueSelect.PA.isLoading = false
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
      return col.modal.PAddenOnUpdate && this.isUpdateDocument()
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
      const _uri = this.config.APIURIBase + this.API.resource + '/' + this.documentId + '/?_populate=professionalActivity'
      this.$http.get(_uri).then((response) => {
        this.modalDoc = response.body
        const _selectedObjectPA = {
          _id: response.body.professionalActivity._id,
          name: response.body.professionalActivity.name
        }
        this.$set(this.vueSelect.PA, 'selectedObject', _selectedObjectPA)
        this.$set(this.modalDoc, 'professionalActivity', response.body.professionalActivity._id)
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
        showAPISuccess({ title: 'OK', message: 'Especialidade cadastrada com sucesso!' })
        this.$emit('set-pag', 1)
        this.$set(this, 'clonedDoc', JSON.parse(JSON.stringify(this.modelFactory)))
        this.$set(this, 'modalDoc', JSON.parse(JSON.stringify(this.modelFactory)))
        this.vueSelect.PA.selectedObject = null
        this.stopLoading(0)
      }, (response) => {
        console.log('response: ', response)
        showAPIErrors(response)
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    updateDoc () {
      this.startLoading()
      this.modalDoc.updatedById = this.session._id
      const _uri = this.config.APIURIBase + this.API.resource

      this.$http.put(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        response.body.updatedAt !== undefined ? this.modalDoc.updatedAt = response.body.updatedAt : null
        showAPISuccess({ title: 'OK', message: 'Especialidade alterada com sucesso!' })
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
          showCancelButton: true,
          showLoaderOnConfirm: true,
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
    'vueSelect.PA.selectedObject': {
      deep: true,
      handler (val, oldVal) {
        console.log('oldVal: ', oldVal)
        console.log('val: ', val)
        val === null ? this.$set(this.modalDoc, 'professionalActivity', '') : this.$set(this.modalDoc, 'professionalActivity', val._id)
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
@import '~scss/config.scss';

#modal {
  animation-duration: $fadeModal;
}
.custom {
  width: 80% !important;
  min-height: 70% !important;
}


</style>
