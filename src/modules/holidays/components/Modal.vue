<template lang="html">
  <transition name="fade">
  <div id="modal" :class="{ 'modal': true, 'is-active': control }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
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
              <dm-form-date :readonly="(modalState === 'update')" :default-value="formFields.date" @input="$v.formFields['date'].$touch()" format="Y-m-d" :input-format="inputDateFormat" placeholder="DD/MM" @event="getValueField" field-name="date"></dm-form-date>
              <span v-if="!$v.formFields['date'].required && $v.formFields['date'].$dirty" class="help is-danger">Data é requerida!</span>
            </div>
            <div class="column is-7">
              <label class="label">Feriado</label>
              <dm-form-name :default-value="formFields.name" @input="$v.formFields['name'].$touch()" placeholder="Informe o nome do feriado" @event="getValueField" field-name="name"></dm-form-name>
              <span v-if="!$v.formFields['name'].required && $v.formFields['name'].$dirty" class="help is-danger">Informe o feriado!</span>
            </div>
            <div class="column is-3">
              <label class="label">Recorrente</label>
              <dm-form-boolean :default-value="formFields.recurrent" @change="$v.formFields['recurrent'].$touch()" @event="getValueField" field-name="recurrent" :checked="false"></dm-form-boolean>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-2">
              <label class="label">Regional</label>
              <dm-form-boolean :default-value="formFields.regional" @change="$v.formFields['regional'].$touch()" @event="getValueField" field-name="regional" :checked="false"></dm-form-boolean>
            </div>
            <div class="column is-4">
              <label class="label">Cidade</label>
              <dm-form-select :default-value="defaultValueSelect" @event="getValueField" field-name="city" api-resource="cities" :disabled="!formFields.regional"></dm-form-select>
              <!-- <dm-form-select @event="getValueField" field-name="city" api-resource="cities" :disabled="!formFields.regional"></dm-form-select> -->
              <span v-if="!formFields['regional'] && formFields['city'] === null" class="help is-danger">Selecione a cidade do feriado!</span>
              <!-- <pre>
                {{ formFields }} - {{ defaultValueSelect }}
              </pre> -->
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12" style="height:200px;">
            </div>
          </div>

        </form>
      </section>
      <dm-modal-footer :save-button-off="saveButtonOff"
                       :request-confirm="isDirty"
                       @close-modal="modalClose"
                       @del-doc="delDoc"
                       :del-button-off="modalState === 'new'"
                       @save-doc="saveDoc"></dm-modal-footer>
    </div>
  </div>
  </transition>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import axios from 'axios'
import izitoast from 'izitoast'
import dmModalFooter from './ModalFooter.vue'
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
        _id: '',
        date: '',
        name: '',
        recurrent: false,
        regional: false,
        city: ''
      },
      defaultValueSelect: {
        _id: '',
        name: ''
      }
    }
  },
  created () {
  },
  mounted () {
    console.log('mounted...')
    if (this.modalState === 'update') {
      const _uri = this.config.APIURIBase + this.API.resource + '/' + this.documentId + '/?_populate=city'
      console.log('_uri: ', _uri)
      axios.get(_uri)
      .then((response) => {
        console.log(response.data)
        this.formFields._id = response.data._id
        this.formFields.name = response.data.name
        this.formFields.date = response.data.date
        this.formFields.recurrent = response.data.recurrent
        this.formFields.regional = response.data.regional
        this.formFields.city = response.data.city._id
        this.defaultValueSelect._id = response.data.city._id
        this.defaultValueSelect.name = response.data.city.name

        setTimeout(() => {
          this.$v.formFields.$reset()
        }, 100)
        console.log(JSON.stringify(this.$v.formFields))
        // this.formFields.date = response.data.date.split('T')[0]
      })
      .catch((error) => {
        console.log('qual o erro que vai sair: ', error, error.response)
        this.showErrors(error.response)
      })
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
      },
      recurrent: {
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
    delDoc () {
      this.$emit('remove-document', { documentId: this.documentId, documentIdentify: this.formFields.name })
    },
    getValueField (fieldObj) {
      this.formFields[fieldObj.fieldName] = fieldObj.fieldValue
    },
    clearFields () {
      this.formFields._id = ''
      this.formFields.date = ''
      this.formFields.name = ''
      this.formFields.recurrent = false
      this.formFields.regional = false
      this.formFields.city = ''
      this.$v.formFields.$reset()
    },
    showErrors (_res) {
      if ((_res === undefined) || (_res.data === undefined)) {
        console.log('_res: ', _res)
        return false
      }
      if (_res.data.err.errmsg !== undefined) {
        izitoast.error({ title: 'Erro', message: _res.data.err.errmsg })
      } else if (_res.data.error !== undefined) {
        izitoast.error({ title: 'Erro', message: _res.data.error })
      } else {
        _.forEach(_res.data.err.errors, (value, key) => {
          izitoast.error({ title: 'Erro', message: value.message })
        })
      }
    },
    saveDoc () {
      const _data = _.clone(this.formFields)
      if (!_data.regional) {
        delete _data.city
      }

      let _uri = this.config.APIURIBase + this.API.resource

      if (this.modalState === 'new') {
        delete _data.updatedById
        _data.createdById = this.userSession._id
        axios.post(_uri, _data)
        .then((response) => {
          izitoast.success({ title: 'OK', message: 'Feriado criado com sucesso!' })
          this.$emit('set-pag', 1)
          this.clearFields()
        })
        .catch((error) => {
          console.log('error: ', error.response)
          this.showErrors(error.response)
        })
      } else {
        delete _data.createdById
        _data.updatedById = this.userSession._id
        axios.put(_uri, _data)
        .then((response) => {
          izitoast.success({ title: 'OK', message: 'Feriado atualizado com sucesso!' })
          this.$emit('set-pag')
          setTimeout(() => {
            this.$v.formFields.$reset()
          }, 100)
        })
        .catch((error) => {
          console.log('error: ', error.response)
          this.showErrors(error.response)
        })
      }
    }
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      userSession: state => {
        const { user } = state
        return user
      },
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
      return this.$v.formFields['date'].$dirty || this.$v.formFields['name'].$dirty || this.$v.formFields['recurrent'].$dirty || this.$v.formFields['regional'].$dirty
    },
    saveButtonOff () {
      return this.$v.formFields.$invalid || ((this.formFields['regional'] && this.formFields['city'] === ''))
    },
    modalTitle () {
      return (this.modalState === 'new') ? this.general.modal.titleNewDocument : this.general.modal.titleUpdateDocument
    },
    inputDateFormat () {
      return (this.formFields.recurrent) ? 'd/F' : 'd/m/Y'
    }
  },
  props: [
    'control',
    'documentId',
    'modalState'
  ],
  watch: {
    'formFields.regional' (val, oldVal) {
      console.log('mudou o check regional: ', val, oldVal)
    },
    'formFields.city' (val, oldVal) {
      console.log('mudou o city: ', val, oldVal)
      if (val === '') {
        console.log('vai zerar o objeto defaultValueSelect: ')
        this.defaultValueSelect = { _id: '', name: '' }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~izitoast/dist/css/iziToast.min.css';

</style>
