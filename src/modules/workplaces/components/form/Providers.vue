<template lang="html">
  <transition name="fade">
    <div class="">
      <pre>{{ formFields }}</pre>
      <pre>{{ specialtiesSelectedObject }}</pre>
      <pre>{{ $v }}</pre>
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="box">
            <h4 class="subtitle is-4">Adicionar</h4>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-search-select v-model="providerSelectedObject"
                           api-resource="providers"
                           :actives="true"
                           label="Prestador *"
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
                           :disabled="providerSelectedObject._id === ''"
                           label="Especilidades *"
                           select-label=""
                         ></dm-form-multi-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-email v-model="formFields.email"
                              @input.native="$v.formFields.email.$touch()"
                              :vuelidate="$v.formFields.email"
                              fa-icon="fa fa-envelope"
                              label="E-mail *"
                              placeholder="Informe o e-mail"></dm-form-email>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <dm-form-number v-model="formFields.phoneExtension"
                              fa-icon="fa fa-phone"
                              label="Fone/Ramal"
                              placeholder="Ramal"></dm-form-number>
              </div>
              <div class="column is-6">
                <dm-form-number v-model="formFields.deadlineScheduleCancel"
                              fa-icon="fa fa-exclamation"
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
                            :show-cancel="false"
                            :show-delete="false"
                            @action-save="saveForm"></dm-buttons>
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
import { required, email } from 'vuelidate/lib/validators'

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

export default {
  data () {
    return {
      providerSelectedObject: {
        _id: '',
        name: ''
      },
      specialtiesSelectedObject: [
        {
          _id: '',
          name: ''
        }
      ],
      formFields: {
        provider: '',
        specialties: [],
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
      }
    }
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
    saveForm () {
      this.updateList = false
      console.log('dentro do saveform')
      Http.post('/workplaces/' + this.workplaceId + '/providers', this.cloneDataFormFields())
      .then(response => {
        console.log('response', response, response.data)
        this.updateList = true
        showAPISuccess({ title: 'OK', message: 'Prestador relacionado ao local de atendimento com sucesso!' })
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    }
  },
  computed: {
    ...mapState({
      general: state => {
        const { general } = state.workplaces
        return general
      },
      session: state => {
        const { user } = state
        return user
      }
    }),
    cloneDataFormFields () {
      const _formsFieldsCloned = _.cloneDeep(this.formFields)

      if (this.state === 'new') {
        _formsFieldsCloned.createdById = this.session._id
      } else {
        _formsFieldsCloned.updatedById = this.session._id
      }

      return _formsFieldsCloned
    },
    specialtiesFilter () {
      return '&professionalActivity=' + this.formFields.professionalActivity
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
    providerSelectedObject (val) {
      console.log('dentro do watch - providerSelectedObject: ', val)
      this.formFields.provider = val._id
    },
    specialtiesSelectedObject (val) {
      console.log('dentro do watch - specialtiesSelectedObject: ', val)
      this.formFields.specialties = val.map(e => { return e._id })
    }
  }
}
</script>

<style lang="css">
</style>
