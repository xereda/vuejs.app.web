<template lang="html">
  <transition name="fade">
  <div id="modal" :class="{ 'modal': true, 'is-active': control }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ general.modal.titleNewDocument }}</p>
        <button class="delete" @click="modalClose()"></button>
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
          </ul>
        </div>
        <form>
          <div class="columns is-multiline">
            <div class="column is-2">
              <label class="label">Data</label>
              <dm-form-date @input="$v.formFields['date'].$touch()" format="Y-m-d" input-format="d/F" placeholder="DD/MM" @event="getValueField" field-name="date" value="12/2/2019"></dm-form-date>
              <span v-if="!$v.formFields['date'].required && $v.formFields['date'].$dirty" class="help is-danger">Data é requerida!</span>
            </div>
            <div class="column is-7">
              <label class="label">Feriado</label>
              <dm-form-name @input="$v.formFields['name'].$touch()" placeholder="Informe o nome do feriado" @event="getValueField" field-name="name"></dm-form-name>
              <span v-if="!$v.formFields['name'].required && $v.formFields['name'].$dirty" class="help is-danger">Informe o feriado!</span>
            </div>
            <div class="column is-3">
              <label class="label">Recorrente</label>
              <dm-form-boolean @event="getValueField" field-name="recurrent" :checked="false"></dm-form-boolean>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-2">
              <label class="label">Regional</label>
              <dm-form-boolean @change="$v.formFields['regional'].$touch()" @event="getValueField" field-name="regional" :checked="false"></dm-form-boolean>
            </div>
            <div class="column is-4">
              <label class="label">Cidade</label>
              <dm-form-select @event="getValueField" field-name="city" api-resource="cities" :disabled="!formFields.regional"></dm-form-select>
              <span v-if="!formFields['regional'] && formFields['city'] === null" class="help is-danger">Selecione a cidade do feriado!</span>
              <!-- <pre>
                {{ $v }} - {{ isDirty }}
              </pre> -->
            </div>
          </div>
        </form>
      </section>
      <dm-modal-footer :save-button-off="saveButtonOff"
                       :request-confirm="isDirty"
                       @close-modal="modalClose"
                       del-button-off="true"
                       @save-doc="saveDoc"></dm-modal-footer>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import dmModalFooter from './modalFooter.vue'
import dmFormDate from '../../ui/form/Date.vue'
import dmFormName from '../../ui/form/Name.vue'
import dmFormBoolean from '../../ui/form/Boolean.vue'
import dmFormSelect from '../../ui/form/Select.vue'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      formFields: {
        date: '',
        name: '',
        recurrent: false,
        regional: false,
        city: '',
        teste: ''
      }
    }
  },
  validations: {
    formFields: {
      date: {
        required
      },
      name: {
        required
      },
      regional: {
        required
      }
    }
  },
  components: {
    dmModalFooter,
    dmFormDate,
    dmFormName,
    dmFormBoolean,
    dmFormSelect
  },
  methods: {
    modalClose () {
      this.$emit('close-modal')
    },
    getValueField (fieldObj) {
      this.formFields[fieldObj.fieldName] = fieldObj.fieldValue
    },
    saveDoc () {
      console.log('doc a ser salvo: ', this.formFields)
      const _uri = this.APIURIBase + this.API.resource
      console.log(_uri)
      axios.post(_uri, this.formFields)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.holidays
        return general
      },
      API: state => {
        const { API } = state.holidays
        return API
      }
    }),
    isDirty () {
      return this.$v.formFields['date'].$dirty || this.$v.formFields['name'].$dirty
    },
    saveButtonOff () {
      return this.$v.formFields.$invalid || ((this.formFields['regional'] && this.formFields['city'] === ''))
    }
  },
  props: [
    'control',
    'documentId',
    'modalState'
  ],
  watch: {
    'formFields.regional' (val, oldVal) {
      console.log('entrou aqui: ', val, oldVal)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
