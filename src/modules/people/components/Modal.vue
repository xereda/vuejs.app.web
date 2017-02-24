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
            <li :class="{ 'is-active': activeTab === 'geral' }">
              <a @click="setActiveAba('geral')">
                <span class="icon"><i class="fa fa-info-circle"></i></span>
                <span>Geral</span>
              </a>
            </li>
            <li :class="{ 'is-active': activeTab === 'vidas' }">
              <a @click="setActiveAba('vidas')">
                <span class="icon"><i class="fa fa-user"></i></span>
                <span>Vidas</span>
              </a>
            </li>
            <li>
              <a>
                <span class="icon"><i class="fa fa-mobile"></i></span>
                <span>Dispositivos</span>
              </a>
            </li>
            </li>
          </ul>
        </div>
        <div :class="{ 'modalTabs': true, 'is-hidden': activeTab !== 'geral', 'fadeIn': true, 'fadeOut': activeTab !== 'geral' }">
          <form>
            <div class="columns is-multiline">
              <div :class="'' + col.modal.responsiveCSS + ''" v-if="validColumn(col, index)" v-for="(col, index) in collection">

                <div v-if="col.type !== 'geo'">
                  <label class="label" v-if="showTopLabel(col.type)">{{ col.label }}</label>
                  <p class="control has-icon">
                    <input v-if="[ 'text', 'date' ].indexOf(col.type) > -1"
                           v-model="modalDoc[index]"
                           v-validate
                           :data-vv-rules="getDataRules(col)"
                           :data-vv-as="col.label"
                           :data-vv-delay="config.delayApplyRule"
                           :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(index) }"
                           :name="index"
                           type="text"
                           :placeholder="col.placeHolder">
                    <input v-if="col.type === 'email'"
                           v-model="modalDoc[index]"
                           v-validate
                           :data-vv-rules="getDataRules(col)"
                           :data-vv-as="col.label"
                           :data-vv-delay="config.delayApplyRule"
                           :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(index), 'to-lower-case': true }"
                           :name="index"
                           type="email"
                           :placeholder="col.placeHolder">
                    <input v-if="col.type === 'password'"
                           v-model="modalDoc[index]"
                           v-validate
                           :data-vv-rules="getDataRules(col)"
                           :data-vv-as="col.label"
                           :data-vv-delay="config.delayApplyRule"
                           :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(index) }"
                           :name="index"
                           type="password"
                           :placeholder="col.placeHolder">
                     <span class="icon is-small">
                       <i v-if="isSimpleInputType(col.type)" :class="col.modal.cssIcon"></i>
                     </span>
                     <span v-if="isSimpleInputType(col.type)" class="help is-danger">{{ errors.first(index) }}&nbsp;</span>
                  </p>
                </div>

                <div v-if="col.type === 'geo'">
                  <div class="columns">
                    <div class="column">
                      <label class="label" v-if="showTopLabel(col.type)">{{ col.geoDefinitions.long.label }}</label>
                      <p class="control has-icon">
                        <input v-model="modalDoc[index].coordinates[0]"
                               v-validate
                               :data-vv-rules="col.geoDefinitions.long.veeValidate"
                               :data-vv-as="col.geoDefinitions.long.label"
                               :data-vv-delay="config.delayApplyRule"
                               :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(col.geoDefinitions.long.name) }"
                               :name="col.geoDefinitions.long.name"
                               type="text"
                               :placeholder="col.geoDefinitions.long.placeHolder">
                         <span class="icon is-small">
                           <i v-if="isSimpleInputType(col.type)" :class="col.modal.cssIcon"></i>
                         </span>
                        <span v-if="isSimpleInputType(col.type)" class="help is-danger">{{ errors.first(col.geoDefinitions.long.name) }}&nbsp;</span>
                      </p>
                    </div>
                    <div class="column">
                      <label class="label" v-if="showTopLabel(col.type)">{{ col.geoDefinitions.lat.label }}</label>
                      <p class="control has-icon">
                        <input v-model="modalDoc[index].coordinates[1]"
                               v-validate
                               :data-vv-rules="col.geoDefinitions.lat.veeValidate"
                               :data-vv-as="col.geoDefinitions.lat.label"
                               :data-vv-delay="config.delayApplyRule"
                               :class="{ 'input': true, 'is-disabled': isReadOnlyOnUpdate(col), 'is-danger': errors.has(col.geoDefinitions.lat.name) }"
                               :name="col.geoDefinitions.lat.name"
                               type="text"
                               :placeholder="col.geoDefinitions.lat.placeHolder">
                         <span class="icon is-small">
                           <i v-if="isSimpleInputType(col.type)" :class="col.modal.cssIcon"></i>
                         </span>
                        <span v-if="isSimpleInputType(col.type)" class="help is-danger">{{ errors.first(col.geoDefinitions.lat.name) }}&nbsp;</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="columns" v-if="col.type === 'boolean'">
                  <div class="column">
                    <label class="label is-hidden-mobile">&nbsp;</label>
                    <p class="control">
                      <label class="checkbox">
                        <input type="checkbox"
                               :class="{ 'checkbox': true, 'is-disabled': isReadOnlyOnUpdate(col) }"
                               v-model="modalDoc[index]">
                        {{ col.label }}
                      </label>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>
        <dm-modal-audit :mutation-prefix="API.mutationPrefix" :resource="API.resource" :last-doc-update-date="getLastDocUpdateDate()" :document-id="documentId" v-if="isUpdateDocument() && activeTab === 'geral'"></dm-modal-audit>
        <div v-if="getModalState() === 'update'" :class="{ 'modalTabs': true, 'is-hidden': activeTab !== 'vidas', 'fadeIn': true, 'fadeOut': activeTab !== 'vidas' }">
          <dm-lives :person-id="documentId"></dm-lives>
        </div>
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
import dmModalAudit from '../../ui/AuditInfo.vue'
import dmLives from './Lives.vue'
import 'animate.css/animate.min.css'
import { showAPIErrors, showAPISuccess } from '../../services/messenger/main'

const SIMPLE_INPUT_TYPES = [ 'text', 'email', 'password', 'date', 'geo' ]

export default {
  data () {
    return {
      activeTab: 'geral',
      modelo: 'opa la',
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
    this.$validator.setLocale('pt_BR')
    this.isUpdateDocument() === true ? this.getDoc() : null
  },
  computed: {
    ...mapState({
      modelFactory: state => {
        const { collection } = state.people
        const _model = {}
        Object.keys(collection).forEach((element, index) => {
          console.log(element, index)
          switch (collection[element].type) {
            case 'text':
              _model[element] = ''
              break
            case 'email':
              _model[element] = ''
              break
            case 'date':
              _model[element] = ''
              break
            case 'number':
              _model[element] = ''
              break
            case 'boolean':
              _model[element] = false
              break
            case 'geo':
              _model[element] = {
                coordinates: [
                  '',
                  ''
                ],
                type: 'Point'
              }
              break
            default:
              null
          }
        })
        return _model
      },
      config: state => {
        const { config } = state
        return config
      },
      API: state => {
        const { API } = state.people
        return API
      },
      collection: state => {
        const { collection } = state.people
        return collection
      },
      general: state => {
        const { general } = state.people
        return general
      },
      session: state => {
        const { user } = state
        return user
      },
      ux: state => {
        const { ux } = state.people
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
    setActiveAba (aba) {
      if (this.getModalState() === 'update') {
        this.activeTab = aba
      }
    },
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
        showAPISuccess({ title: 'OK', message: 'Pessoa cadastrada com sucesso!' })
        this.$emit('set-pag', 1)
        this.$set(this, 'modalDoc', JSON.parse(JSON.stringify(this.modelFactory)))
        this.$set(this, 'clonedDoc', JSON.parse(JSON.stringify(this.modelFactory)))
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

      this.$http.put(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        response.body.updatedAt !== undefined ? this.modalDoc.updatedAt = response.body.updatedAt : null
        showAPISuccess({ title: 'OK', message: 'Pessoa atualizada com sucesso!' })
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
    dmLives
  },
  watch: {
    documentId (val) {
      this.errors.clear()
    },
    'modalDoc.geoLocation.type': {
      handler (val, oldVal) {
        console.log('val: ', val)
        console.log('oldVal: ', oldVal)
      },
      deep: true
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
@import '~izitoast/dist/css/iziToast.min.css';
@import '../../../scss/config.scss';

#modal {
  animation-duration: $fadeModal;
}
.custom {
  width: 80% !important;
}

.modalTabs {
  animation-duration: $fadeModalTabsTime;
}

</style>
