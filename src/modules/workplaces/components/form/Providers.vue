<template lang="html">
  <transition name="fade">
    <div class="">
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="box">
            <h4 class="subtitle is-4">Adicionar</h4>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-multi-select v-model="providerSelectedObject"
                           api-resource="providers"
                           :actives="true"
                           label="Prestador *"
                           select-label=""
                         ></dm-form-multi-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-multi-select v-model="specialtiesSelectedObject"
                           api-resource="providers/58b8f12a3485d918d15f5f6a/specialties"
                           :actives="true"
                           label="Prestador *"
                           select-label=""
                         ></dm-form-multi-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-input v-model="formFields.regionalCouncilCode"
                              fa-icon="fa fa-credit-card-alt"
                              label="Código no CR *"
                              placeholder="cod. no conselho reg."></dm-form-input>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-buttons :save-enabled="enableSaveButton"
                            :show-cancel="false"
                            :show-delete="false"
                            @action-save="saveForm"></dm-form-buttons>
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
import { required } from 'vuelidate/lib/validators'

import { mapState } from 'vuex'

import _ from 'lodash'

import Http from 'utils/services/http'
import { showAPIErrors, showAPISuccess } from 'utils/services/messenger/main'

import DmFormMultiSelect from 'utils/ui/form/MultiSelect.vue'
import DmFormSelect from 'utils/ui/form/Select.vue'
import DmFormEmail from 'utils/ui/form/Email.vue'
import DmFormBoolean from 'utils/ui/form/Boolean.vue'
import DmFormNumber from 'utils/ui/form/Number.vue'
import DmFormButtons from 'utils/ui/form/Buttons.vue'

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
        specialties: [
          { specialty: '' }
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
      specialties: {
        '0': {
          required
        }
      }
    }
  },
  components: {
    DmFormMultiSelect,
    DmFormSelect,
    DmFormNumber,
    DmFormEmail,
    DmFormBoolean,
    DmFormButtons,
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
    'formFields.professionalActivity' (val) {
      this.formFields.specialty = ''
    }
  }
}
</script>

<style lang="css">
</style>
