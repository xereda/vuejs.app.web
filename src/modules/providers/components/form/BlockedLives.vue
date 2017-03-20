<template lang="html">
  <transition name="fade">
    <div class="">
      <div class="columns">
        <div class="column is-4">
          <div class="box">
            <h4 class="subtitle is-4">Adicionar</h4>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-search-select v-model="formFields.selectedObject"
                           api-resource="lives"
                           :actives="true"
                           label="Vida *"
                         ></dm-form-search-select>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <dm-form-date v-model="formFields.startDate"
                              fa-icon="fa fa-calendar"
                              :readonly="false"
                              @input="$v.formFields['startDate'].$touch()"
                              format="Y-m-d"
                              input-format="d/m/Y"
                              :min-date="new Date()"
                              label="Data Início"
                              placeholder="Data de início"></dm-form-date>
              </div>
              <div class="column">
                <dm-form-date v-model="formFields.endDate"
                              fa-icon="fa fa-calendar"
                              :readonly="false"
                              format="Y-m-d"
                              input-format="d/m/Y"
                              :min-date="new Date(this.formFields.startDate)"
                              label="Data Fim"
                              placeholder="Data de Fim"></dm-form-date>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <dm-form-textarea v-model="formFields.notes"
                              label="Observações"
                              placeholder="Descreva sobre o bloqueio"></dm-form-textarea>
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
         <dm-blocked-lives-list api-resource="providers"
                              :mainId="providerId"
                              subDoc="blockedLives"
                              :update-list="updateList"
                              :data-def="dataTableDef"
                              del-item-message="Vida removida com sucesso!"
                              ></dm-blocked-lives-list>
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

import DmFormSearchSelect from '../../../../utils/ui/form/SearchSelect.vue'
import DmFormDate from '../../../../utils/ui/form/Date.vue'
import DmFormButtons from '../../../../utils/ui/form/Buttons.vue'
import DmFormTextarea from '../../../../utils/ui/form/Textarea.vue'

import DmBlockedLivesList from '../../../../utils/ui/form/SubDocumentsList.vue'

export default {
  name: 'DmProviderBlockedLives',
  data () {
    return {
      formFields: {
        selectedObject: {},
        blockedLife: '',
        startDate: '',
        endDate: '',
        notes: ''
      },
      updateList: false,
      dataTableDef: {
        _id: {
          field: 'blockedLife._id',
          visible: false,
          class: 'is-hidden-mobile'
        },
        blockedLife: {
          label: 'Vida',
          field: 'blockedLife.name',
          visible: true,
          class: ''
        },
        startDate: {
          label: 'Data Início',
          field: 'startDate',
          type: 'date',
          visible: true,
          class: 'is-hidden-mobile'
        },
        endDate: {
          label: 'Data Fim',
          field: 'endDate',
          visible: true,
          type: 'date',
          class: ''
        },
        notes: {
          label: 'Observações',
          field: 'notes',
          visible: true,
          class: 'is-hidden-mobile'
        }
      }
    }
  },
  validations: {
    formFields: {
      blockedLife: {
        required
      },
      startDate: {
        required
      }
    }
  },
  components: {
    DmFormButtons,
    DmBlockedLivesList,
    DmFormSearchSelect,
    DmFormDate,
    DmFormTextarea
  },
  methods: {
    saveForm () {
      this.updateList = false
      Http.post('/providers/' + this.providerId + '/blockedLives', this.objectDataPost)
      .then(response => {
        this.updateList = true
        showAPISuccess({ title: 'OK', message: 'Vida relacionada ao prestador com sucesso!' })
      })
      .catch(error => {
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
      const _obj = {
        blockedLife: this.formFields.blockedLife,
        startDate: this.formFields.startDate,
        endDate: this.formFields.endDate,
        notes: this.formFields.notes,
        createdById: this.session._id
      }
      if (this.formFields.endDate === '') delete _obj.endDate
      if (this.formFields.notes === '') delete _obj.notes
      return _obj
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
    'formFields.selectedObject' (val) {
      this.formFields.blockedLife = val._id
    }
  }
}
</script>

<style lang="scss">
</style>
