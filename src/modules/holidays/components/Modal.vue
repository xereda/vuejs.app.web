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
              <dm-form-date fa-icon="fa fa-calendar"
                            :readonly="(modalState === 'update')"
                            v-model="formFields.date"
                            @input="$v.formFields['date'].$touch()"
                            format="Y-m-d"
                            :input-format="inputDateFormat"
                            placeholder="DD/MM"
                            field-name="date"></dm-form-date>
              <span v-if="!$v.formFields['date'].required && $v.formFields['date'].$dirty" class="help is-danger">Data é requerida!</span>
            </div>
            <div class="column is-7">
              <label class="label">Feriado</label>
              <dm-form-name fa-icon="fa fa-calendar" v-model="formFields.name" @input="$v.formFields['name'].$touch()" placeholder="Informe o nome do feriado"></dm-form-name>
              <span v-if="!$v.formFields['name'].required && $v.formFields['name'].$dirty" class="help is-danger">Informe o feriado!</span>
            </div>
            <div class="column is-3">
              <label class="label">Recorrente</label>
              <dm-form-boolean v-model="formFields.recurrent"></dm-form-boolean>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-2">
              <label class="label">Regional</label>
              <dm-form-boolean v-model="formFields.regional"></dm-form-boolean>
            </div>
            <div class="column is-4">
              <label class="label">Cidade</label>
              <dm-form-select v-model="formFields.city" field-name="city" placeholder="Selecione uma cidade" :actives="true" api-resource="cities" :disabled="!formFields.regional"></dm-form-select>
              <span v-if="!formFields['regional'] && formFields['city'] === null" class="help is-danger">Selecione a cidade do feriado!</span>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12" style="height:200px;">
            </div>
          </div>
        </form>
        <!-- <pre>{{ $v.formFields }}</pre>
        <pre>{{ formFields }}</pre> -->
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
import Http from '../../../utils/services/http'
import dmModalFooter from '../../../utils/ui/ModalFooter.vue'
import dmFormDate from '../../../utils/ui/form/Date.vue'
import dmFormName from '../../../utils/ui/form/Name.vue'
import dmFormBoolean from '../../../utils/ui/form/Boolean.vue'
import dmFormSelect from '../../../utils/ui/form/Select.vue'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required } from 'vuelidate/lib/validators'

import { showAPIErrors, showAPISuccess } from '../../../utils/services/messenger/main'

export default {
  data () {
    return {
      formFields: {
        _id: '',
        date: '',
        name: '',
        recurrent: '',
        regional: '',
        city: ''
      }
    }
  },
  mounted () {
    if (this.modalState === 'update') {
      const _uri = this.API.resource + '/' + this.documentId + '/?_populate=city'
      console.log(_uri)
      Http.get(_uri)
      .then((response) => {
        this.formFields._id = response.data._id
        this.formFields.name = response.data.name
        this.formFields.date = response.data.date
        this.formFields.recurrent = response.data.recurrent
        this.formFields.regional = response.data.regional
        this.formFields.city = response.data.city._id

        setTimeout(() => {
          this.$v.formFields.$reset()
        }, 100)
        // this.formFields.date = response.data.date.split('T')[0]
      })
      .catch((error) => {
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
    clearFields () {
      this.formFields._id = ''
      this.formFields.date = ''
      this.formFields.name = ''
      this.formFields.recurrent = true
      this.formFields.regional = true
      this.formFields.city = ''
      setTimeout(() => {
        this.$v.formFields.$reset()
      }, 0)
    },
    showErrors (_res) {
      showAPIErrors(_res)
    },
    saveDoc () {
      const _data = _.cloneDeep(this.formFields)
      if (_data.regional === false) {
        _data.city = ''
      }
      let _uri = this.API.resource
      if (this.modalState === 'new') {
        delete _data.updatedById
        _data.createdById = this.userSession._id
        Http.post(_uri, _data)
        .then((response) => {
          showAPISuccess({ title: 'OK', message: 'Feriado cadastrado com sucesso!' })
          this.$emit('set-pag', 1)
          this.clearFields()
        })
        .catch((error) => {
          this.showErrors(error.response)
        })
      } else {
        delete _data.createdById
        _data.updatedById = this.userSession._id
        console.log(JSON.stringify(_data))
        Http.put(_uri, _data)
        .then((response) => {
          showAPISuccess({ title: 'OK', message: 'Feriado atualizado com sucesso!' })
          this.$emit('set-pag')
          setTimeout(() => {
            this.$v.formFields.$reset()
          }, 100)
        })
        .catch((error) => {
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
      return this.$v.formFields['date'].$dirty || this.$v.formFields['name'].$dirty
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
  }
}
</script>

<style lang="scss" scoped>

</style>
