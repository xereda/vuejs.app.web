<template lang="html">
  <transition name="fade">
    <div class="">
      <div class="columns is-multiline">
        <div class="column is-4" ref="form">
          <div class="box">
            <h4 class="subtitle is-4">{{ title }}</h4>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-search-select v-model="providerSelectedObject"
                           api-resource="providers"
                           :disabled="localState === 'update'"
                           :actives="true"
                           label="Prestador *"
                           z-index=""
                           select-label=""
                         ></dm-form-search-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-multi-select v-model="specialtiesSelectedObject"
                           api-resource="providers"
                           subdoc="specialties"
                           subdoc-field="specialty"
                           :doc-id="providerSelectedObject._id"
                           :disabled="disableSpecialtiesMulti"
                           label="Especilidades *"
                           z-index=""
                           select-label=""
                         ></dm-form-multi-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-multi-select v-model="agreementsSelectedObject"
                           api-resource="agreements"
                           label="Convênios *"
                           select-label=""
                           z-index=""
                         ></dm-form-multi-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-email v-model="formFields.email"
                              @input.native="$v.formFields.email.$touch()"
                              :vuelidate="$v.formFields.email"
                              label="E-mail"
                              :hidden-icon="true"
                              placeholder="Informe o e-mail"></dm-form-email>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <dm-form-number v-model="formFields.phoneExtension"
                              fa-icon="fa fa-phone"
                              :hidden-icon="true"
                              label="Fone/Ramal"
                              placeholder="Ramal"></dm-form-number>
              </div>
              <div class="column is-6">
                <dm-form-number v-model="formFields.deadlineScheduleCancel"
                              fa-icon="fa fa-exclamation"
                              :hidden-icon="true"
                              mask="99"
                              label="Prazo canc."
                              placeholder="Minutos"></dm-form-email>
              </div>
              <div class="column is-11">
                <dm-form-boolean v-model="formFields.lockedCancel"
                              label="Bloqueia canc."></dm-form-boolean>
              </div>
              <div class="column">
                <dm-form-textarea v-model="formFields.alertCancel"
                               :disabled="!formFields.lockedCancel"
                               label="Alerta bloqueio"></dm-form-textarea>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-buttons :save-enabled="enableSaveButton"
                            :show-cancel="true"
                            :cancel-enabled="true"
                            @action-cancel="cancelForm"
                            :show-delete="false"
                            @action-save="saveForm"
                            :label-save="labelButtonSave"></dm-buttons>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
         <dm-list api-resource="workplaces"
                              :mainId="workplaceId"
                              subDoc="providers"
                              :update-list="updateList"
                              :data-def="dataTableDef"
                              del-item-message="Prestador removido com sucesso!"
                              @action-after-delete="clearDataForm"
                              :update-item-disabled="false"
                              @update-action="readDoc"
                              ></dm-list>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import _ from 'lodash'
import Http from 'utils/services/http'
import { showAPIErrors, showAPISuccess } from 'utils/services/messenger/main'

import { DmFormMultiSelect,
         DmFormSearchSelect,
         DmFormEmail,
         DmFormBoolean,
         DmFormNumber,
         DmFormTextarea,
         DmButtons } from 'utils/ui/form/main'

import DmList from 'utils/ui/form/SubDocumentsList.vue'

import topbar from 'topbar'
import Spinner from 'spin'
let SPIN = {}

export default {
  data () {
    return {
      localState: 'new',
      temp: {},
      providerSelectedObject: {
      },
      specialtiesSelectedObject: [
      ],
      agreementsSelectedObject: [
      ],
      formFields: {
        provider: '',
        specialties: [
        ],
        agreements: [
        ],
        phoneExtension: '',
        email: '',
        deadlineScheduleCancel: '',
        lockedCancel: false,
        alertCancel: ''
      },
      updateList: false,
      dataTableDef: {
        _id: {
          field: 'provider._id',
          visible: false
        },
        provider: {
          label: 'Prestador',
          field: 'provider.name',
          visible: true
        }
      }
    }
  },
  validations: {
    formFields: {
      provider: {
        required
      },
      email: {
        email
      },
      deadlineScheduleCancel: {
        minLength: minLength(1),
        maxLength: maxLength(2)
      }
    }
  },
  mounted () {
    topbar.config(this.config.topbar)
    SPIN = new Spinner(this.config.spinner)
  },
  components: {
    DmFormSearchSelect,
    DmFormMultiSelect,
    DmFormNumber,
    DmFormEmail,
    DmFormBoolean,
    DmButtons,
    DmFormTextarea,
    DmList
  },
  methods: {
    cancelForm () {
      console.log('dentro de cancelForm')
      this.localState = 'new'
      this.clearDataForm()
    },
    clearDataForm () {
      this.formFields.provider = ''
      this.formFields.specialties = []
      this.formFields.agreements = []
      this.formFields.email = ''
      this.formFields.phoneExtension = ''
      this.formFields.deadlineScheduleCancel = ''
      this.formFields.lockedCancel = false
      this.formFields.alertCancel = ''
      this.providerSelectedObject = {}
      this.specialtiesSelectedObject = []
      this.agreementsSelectedObject = []
    },
    hidrateDataForm (data) {
      this.temp = data
      console.log(data, data.agreements)
      this.providerSelectedObject = { _id: data.provider._id, name: data.provider.name }
      this.formFields.email = data.email
      this.formFields.phoneExtension = data.phoneExtension !== null ? data.phoneExtension.toString() : ''
      this.formFields.deadlineScheduleCancel = data.deadlineScheduleCancel !== null ? data.deadlineScheduleCancel.toString() : ''
      this.formFields.lockedCancel = data.lockedCancel
      this.formFields.alertCancel = data.alertCancel
      setTimeout(() => {
        this.agreementsSelectedObject = data.agreements.map(e => { return { '_id': e.agreement, 'name': e.name } })
        this.specialtiesSelectedObject = data.specialties.map(e => { return { '_id': e.specialty, 'name': e.name } })
        topbar.hide()
        SPIN.stop()
      }, 100)
    },
    readDoc (providerId) {
      SPIN.spin(this.$refs.form)
      topbar.show()
      Http.get('/workplaces/' + this.workplaceId + '/providers/?provider=' + providerId)
      .then(response => {
        this.localState = 'update'
        console.log(response.data)
        this.hidrateDataForm(response.data[0])
      })
      .catch(error => {
        console.log(error)
        topbar.hide()
      })
    },
    createDoc () {
      topbar.show()
      Http.post('/workplaces/' + this.workplaceId + '/providers', this.cloneDataFormFields)
      .then(response => {
        this.updateList = true
        showAPISuccess({ title: 'OK', message: 'Prestador relacionado ao local de atendimento com sucesso!' })
        topbar.hide()
        this.localState = 'update'
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
        topbar.hide()
      })
    },
    updateDoc () {
      topbar.show()
      Http.put('/workplaces/' + this.workplaceId + '/providers/' + this.formFields.provider, this.cloneDataFormFields)
      .then(response => {
        this.updateList = true
        showAPISuccess({ title: 'OK', message: 'Prestador atualizado com sucesso!' })
        topbar.hide()
        // this.localState = 'new'
        // setTimeout(() => {
        //   this.clearDataForm()
        // }, 200)
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
        topbar.hide()
      })
    },
    saveForm () {
      this.updateList = false
      this.localState === 'new' ? this.createDoc() : this.updateDoc()
    }
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      general: state => {
        const { general } = state.workplaces
        return general
      },
      session: state => {
        const { user } = state
        return user
      }
    }),
    title () {
      return this.localState === 'new' ? 'Adicionar' : 'Alterar'
    },
    labelButtonSave () {
      return this.localState === 'new' ? 'Adicionar' : 'Alterar'
    },
    disableSpecialtiesMulti () {
      if (this.formFields.provider === '') return true
      return false
    },
    cloneDataFormFields () {
      const _formsFieldsCloned = _.cloneDeep(this.formFields)
      this.localState === 'new' ? _formsFieldsCloned.createdById = this.session._id : _formsFieldsCloned.updatedById = this.session._id
      console.log('_formsFieldsCloned: ', _formsFieldsCloned)
      return _formsFieldsCloned
    },
    enableSaveButton () {
      if (_.filter(this.$v.formFields, e => e.$invalid).length > 0) return false
      return true
    }
  },
  props: {
    workplaceId: {
      type: String,
      required: true
    }
  },
  watch: {
    providerSelectedObject (val, oldVal) {
      this.formFields.provider = val._id
    },
    specialtiesSelectedObject (val) {
      console.log('dentro de specialtiesSelectedObject: ', val.length, val)
      val.length > 0 ? this.formFields.specialties = val.map(e => { return { 'specialty': e._id, 'name': e.name } }) : this.formFields.specialties = []
    },
    agreementsSelectedObject (val) {
      console.log('dentro de agreementsSelectedObject: ', val.length, val)
      val.length > 0 ? this.formFields.agreements = val.map(e => { return { 'agreement': e._id, 'name': e.name } }) : this.formFields.agreements = []
    }
  }
}
</script>

<style lang="scss" scoped>

  .teste {
    z-index: 9;
  }

</style>
