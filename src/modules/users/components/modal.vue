<template lang="html">
  <div id="modal" :class="{ 'modal': true, 'is-active': control, 'animated': true, 'fadeIn': fadeIn, 'fadeOut': fadeOut }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="modalClose()"></button>
      </header>
      <section class="modal-card-body">
        <dm-notification v-if="showNotification" set-notification-closed="closedNotification"></dm-notification>
        <form>
          <div class="columns is-multiline">
            <div :class="col.modal.responsiveCSS" v-if="validColumn(index)" v-for="(col, index) in collection">

              <label class="label" v-if="showTopLabel(col.type)">{{ col.label }}</label>

              <p class="control has-icon">
                <input v-if="[ 'text', 'date' ].indexOf(col.type) > -1"
                       v-model="modalDoc[index]"
                       v-validate
                       :data-rules="getDataRules(col)"
                       :data-as="col.label"
                       :data-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-danger': errors.has(index) }"
                       :name="index"
                       type="text"
                       :placeholder="col.placeHolder">
                <input v-if="col.type === 'email'"
                       v-model="modalDoc[index]"
                       v-validate
                       :data-rules="getDataRules(col)"
                       :data-as="col.label"
                       :data-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-danger': errors.has(index) }"
                       :name="index"
                       type="email"
                       :placeholder="col.placeHolder">
                <input v-if="col.type === 'password'"
                       v-model="modalDoc[index]"
                       v-validate
                       :data-rules="getDataRules(col)"
                       :data-as="col.label"
                       :data-delay="config.delayApplyRule"
                       :class="{ 'input': true, 'is-danger': errors.has(index) }"
                       :name="index"
                       type="password"
                       :placeholder="col.placeHolder">
                <i v-if="isSimpleInputType(col.type)" :class="col.modal.cssIcon"></i>
                <span v-if="isSimpleInputType(col.type)" class="help is-danger">{{ errors.first(index) }}&nbsp;</span>
              </p>

              <p class="control" v-if="col.type === 'boolean'">
                <label class="checkbox">
                  <input type="checkbox"
                         v-model="modalDoc[index]">
                  {{ col.label }}
                </label>
              </p>

            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <a :class="getCSSButtonSave" @click="formSubmit()">Salvar</a>
        <a class="button" @click="modalClose()">Cancelar</a>
        <input type="text" v-model="teste" ref="teste" v-focus />
      </footer>
    </div>
  </div>
</template>

<script>
import topbar from 'topbar'
import 'animate.css/animate.min.css'

import Vue from 'Vue'
import bulmaMessage from 'xereda-vue-bulma-message'
const BulmaMessageComponent = Vue.extend(bulmaMessage)
const openMessage = (propsData = {
  title: '',
  message: '',
  type: '',
  direction: '',
  duration: 1500,
  container: '.messages'
}) => {
  return new BulmaMessageComponent({
    el: document.createElement('div'),
    propsData
  })
}

import { mapState } from 'vuex'

const SIMPLE_INPUT_TYPES = [ 'text', 'email', 'password', 'date' ]

export default {
  data () {
    return {
      teste: 'opa la',
      isLoading: false,
      showNotification: false,
      fadeIn: true,
      fadeOut: false,
      modalDoc: {
      }
    }
  },
  mounted () {
    topbar.config(this.topbarConfig)
    topbar.show()
    this.$validator.setLocale('pt_BR')
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
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
      return _.isEmpty(this.document) ? this.general.modal.titleNewDocument : this.general.modal.titleUpdateDocument
    },
    getCSSButtonSave () {
      if ((this.errors.any() === true) || (this.isLoading === true)) {
        return 'button is-info is-disabled'
      }
      return 'button is-info'
    }
  },
  methods: {
    showError () {
      const _obj = {
        title: 'Erro',
        message: 'aqui entra a mensagem de erro',
        duration: 5000,
        showCloseButton: true,
        type: 'danger'
      }
      this.openBulmaMessage(_obj)
    },
    openBulmaMessage (obj) {
      openMessage({
        title: obj.title,
        message: obj.message,
        duration: obj.duration,
        showCloseButton: obj.showCloseButton,
        type: obj.type
      })
    },
    closedNotification (closed) {
      closed ? this.showNotification = false : this.showNotification = true
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
    createDoc () {
      this.startLoading()
      this.modalDoc.createdById = this.session._id
      const _uri = this.config.APIURIBase + 'users'

      this.$http.post(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        // get status
        console.log(response.status)
        // get status text
        console.log(response.statusText)
        const _obj = {
          title: 'Ok',
          message: 'O documento foi criado com sucesso!',
          duration: this.config.modal.messagePresentationTime,
          showCloseButton: true,
          type: 'success'
        }
        this.modalDoc = {}
        this.openBulmaMessage(_obj)
        this.$emit('set-pag', 1)
        this.stopLoading(0)
      }, (response) => {
        const _obj = {
          title: 'Erro inserindo documento',
          message: '',
          duration: this.config.modal.messagePresentationTime,
          showCloseButton: true,
          type: 'danger'
        }
        if (response.status === 0) {
          _obj.message += 'Erro de conexão a API DocMob'
        } else if (response.data.err.errors !== undefined) {
          Object.keys(response.data.err.errors).forEach((element, index) => {
            _obj.message += response.data.err.errors[element].message + '<br />'
          })
        } else {
          _obj.message += response.data.err.errmsg
        }
        this.openBulmaMessage(_obj)
        this.stopLoading(this.config.modal.delayModalSaveButton)
      })
    },
    formSubmit () {
      this.$validator.validateAll()
      if (this.errors.any() === false) {
        this.createDoc()
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
    validColumn (name) {
      if ((name === '_id') || (name === 'createdById') || (name === 'updatedById')) {
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
        self.$emit('set-modal-state', false)
      }, 510)
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  components: {
    bulmaMessage
  },
  props: [
    'control',
    'document'
  ]
}
</script>

<style lang="scss">
@import '../../../scss/config.scss';

#modal {
  animation-duration: $fadeModal;
}


</style>
