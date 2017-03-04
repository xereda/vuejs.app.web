<template lang="html">
  <transition name="fade">
    <div class="">
      <pre>{{ formFields }}</pre>
      <pre>{{ $v.formFields }}</pre>
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
         aqui entra a grid
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

import _ from 'lodash'

import DmFormSelect from '../../../ui/form/Select.vue'
import DmFormInput from '../../../ui/form/Input.vue'
import DmFormButtons from '../../../ui/form/Buttons.vue'

export default {
  data () {
    return {
      formFields: {
        professionalActivity: '',
        specialty: '',
        regionalCouncilCode: ''
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
    DmFormButtons
  },
  methods: {
    saveForm () {
      console.log('dentro do saveform')
    }
  },
  computed: {
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
  }
}
</script>

<style lang="css">
</style>
