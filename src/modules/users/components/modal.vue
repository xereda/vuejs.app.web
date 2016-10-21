<template lang="html">
  <div id="modal" :class="{ 'modal': true, 'is-active': control, 'animated': true, 'fadeIn': fadeIn, 'fadeOut': fadeOut }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="modalClose()"></button>
      </header>
      <section class="modal-card-body">
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
      </footer>
    </div>
  </div>
</template>

<script>
import 'animate.css/animate.min.css'
import { mapState } from 'vuex'

const SIMPLE_INPUT_TYPES = [ 'text', 'email', 'password', 'date' ]

export default {
  data () {
    return {
      fadeIn: true,
      fadeOut: false,
      modalDoc: {
      }
    }
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
      if (this.errors.any() === true) {
        return 'button is-info is-disabled'
      }
      return 'button is-info'
    }
  },
  mounted () {
    this.$validator.setLocale('pt_BR')
    // console.log('moment: ', moment())
  },
  methods: {
    createDoc () {
      this.modalDoc.createdById = this.session._id
      const _uri = this.config.APIURIBase + 'users'

      this.$http.post(_uri, this.modalDoc, { emulateJSON: true }).then((response) => {
        // get status
        console.log(response.status)
        // get status text
        console.log(response.statusText)
      }, (response) => {
        console.log('deu erro - response: ', response)
      })
    },
    formSubmit () {
      console.log('dentro do formSubmit', this.errors, this.errors.any())
      this.$validator.validateAll()
      if (this.errors.any() === false) {
        console.log('nao ha erros')
        console.log('modalDoc: ', this.modalDoc)
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
  components: {},
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
