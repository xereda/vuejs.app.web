<template lang="html">
  <transition name="fade">
    <div class="">
      <div class="columns">
        <div class="column is-narrow">
          <div class="box">
            <h4 class="subtitle is-4">Adicionar</h4>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-select v-model="formFields.professionalActivity"
                           api-resource="professionalActivities"
                           @input="$v.formFields['professionalActivity'].$touch()"
                           :actives="true"
                           :vuelidate="$v.formFields['professionalActivity']"
                           label="Ramo de Atividade *"
                           ></dm-form-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-select v-model="formFields.specialty"
                           api-resource="specialties"
                           @input="$v.formFields['specialty'].$touch()"
                           :actives="true"
                           :vuelidate="$v.formFields['specialty']"
                           :filter="specialtiesFilter"
                           label="Especialidades *"
                         ></dm-form-select>
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
         <dm-specialties-list api-resource="providers"
                              :mainId="providerId"
                              subDoc="specialties"
                              :update-list="updateList"
                              :data-def="dataTableDef"
                              del-item-message="Especialidade removida com sucesso!"
                              ></dm-specialties-list>
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

import Http from '../../../../utils/services/http'
import { showAPIErrors, showAPISuccess } from '../../../../utils/services/messenger/main'

import DmFormSelect from '../../../../utils/ui/form/Select.vue'
import DmFormInput from '../../../../utils/ui/form/Input.vue'
import DmFormButtons from '../../../../utils/ui/form/Buttons.vue'

import DmSpecialtiesList from '../../../../utils/ui/form/SubDocumentsList.vue'

export default {
  data () {
    return {
      formFields: {
        professionalActivity: '',
        specialty: '',
        regionalCouncilCode: ''
      },
      updateList: false,
      dataTableDef: {
        _id: {
          field: 'specialty._id',
          visible: false
        },
        specialty: {
          label: 'Especialidade',
          field: 'specialty.name',
          visible: true
        },
        regionalCouncilCode: {
          label: 'Código no CR',
          field: 'regionalCouncilCode',
          visible: true
        }
      }
    }
  },
  validations: {
    formFields: {
      professionalActivity: {
        required
      },
      specialty: {
        required
      }
    }
  },
  components: {
    DmFormSelect,
    DmFormInput,
    DmFormButtons,
    DmSpecialtiesList
  },
  methods: {
    saveForm () {
      this.updateList = false
      console.log('dentro do saveform')
      Http.post('/providers/' + this.providerId + '/specialties', this.objectDataPost)
      .then(response => {
        console.log('response', response, response.data)
        this.updateList = true
        showAPISuccess({ title: 'OK', message: 'Especialidade relacionada ao prestador com sucesso!' })
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
        const { general } = state.providers
        return general
      },
      session: state => {
        const { user } = state
        return user
      },
      breadcrumbs: state => {
        const { breadcrumbs } = state.providers.general
        return breadcrumbs
      }
    }),
    objectDataPost () {
      return {
        specialty: this.formFields.specialty,
        regionalCouncilCode: this.formFields.regionalCouncilCode,
        createdById: this.session._id
      }
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
    providerId: {
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
