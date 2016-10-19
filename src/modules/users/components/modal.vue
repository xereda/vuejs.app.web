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
            <div :class="col.cssResponsiveModal" v-if="validColumn(index)" v-for="(col, index) in collection">

              <label class="label" v-if="showTopLabel(col.type)">{{ col.label }}</label>

              <p class="control has-icon" v-if="isTextInput(col.type)">
                <input v-validate :data-rules="getDataRules(col)" :data-as="col.label" :data-delay="config.delayApplyRule" :class="{ 'input': true, 'is-danger': errors.has(index) }" :name="index" :type="col.type" :placeholder="col.placeHolder">
                <i :class="col.cssIcon"></i>
                <span v-show="errors.has(index)" class="help is-danger">{{ errors.first(index) }}</span>
              </p>

              <p class="control" v-if="isCheckboxInput(col.type)">
                <label class="checkbox">
                  <input type="checkbox">
                  {{ col.label }}
                </label>
              </p>

            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <a :class="getCSSButtonSave()">Salvar</a>
        <a class="button" @click="modalClose()">Cancel</a>
      </footer>
    </div>
  </div>
</template>

<script>
import messages from '../../../locale/veeValidate/pt_BR/messages'
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
Vue.use(VeeValidate)
// Merge dictionary messages.
Validator.updateDictionary({
  pt_BR: {
    messages
  }
})
Validator.extend('ignore', {
  messages: {},
  validate: value => true
})

import 'animate.css/animate.min.css'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      fadeIn: true,
      fadeOut: false
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
      }
    }),
    title () {
      return _.isEmpty(this.document) ? this.general.modal.titleNewDocument : this.general.modal.titleUpdateDocument
    }
  },
  mounted () {
    this.$validator.setLocale('pt_BR')
  },
  methods: {
    getCSSButtonSave () {
      if (this.errors.any() === false) {
        return 'button is-info is-disabled'
      }
      return 'button is-info'
    },
    getDataRules (col) {
      if ((col.required === true) && (col.veeValidate !== undefined)) {
        return 'required|' + col.veeValidate
      } else if (col.required === true) {
        return 'required'
      } else if (col.veeValidate !== undefined) {
        return col.veeValidate
      } else {
        return 'ignore'
      }
    },
    showTopLabel (type) {
      if (this.isTextInput(type) === true) {
        return true
      }
      return false
    },
    isTextInput (type) {
      switch (type) {
        case 'text':
          return true
        case 'email':
          return true
        case 'password':
          return true
        default:
          return false
      }
    },
    isCheckboxInput (type) {
      if (type === 'boolean') {
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
