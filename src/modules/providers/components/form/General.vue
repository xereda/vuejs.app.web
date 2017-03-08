<template lang="html">
  <transition name="fade">
    <div class="main-canvas">
      <!-- providerId: <pre>{{ providerId }}</pre>
      state: <pre>{{ state }}</pre>
      form: <pre>{{ formFields }}</pre> -->
      <dm-breadcrumbs :object-links="breadcrumbs" :state="state"></dm-breadcrumbs>

      <div class="container box">
        <p class="title is-4">Dados Gerais</p>
        <div class="columns is-multiline">
          <div class="column is-7">
            <div class="columns is-multiline">
              <div class="column is-6">
                <dm-form-name v-model="formFields.name"
                              @input="$v.formFields['name'].$touch()"
                              :vuelidate="$v.formFields['name']"
                              fa-icon="fa fa-user-md"
                              label="Nome *"
                              placeholder="Informe o nome"></dm-form-name>
              </div>
              <div class="column is-6">
                <dm-form-email v-model="formFields.email"
                              @input="$v.formFields['email'].$touch()"
                              :vuelidate="$v.formFields['email']"
                              fa-icon="fa fa-envelope"
                              label="E-mail *"
                              placeholder="Informe o nome"></dm-form-email>
              </div>
              <div class="column is-5">
                <dm-form-radio v-model="formFields.entityType"
                              @input="$v.formFields['entityType'].$touch()"
                              :vuelidate="$v.formFields['entityType']"
                              :options="entityTypeOptions"
                              label="Tipo *"></dm-form-radio>
              </div>
              <div class="column is-5" v-if="formFields.entityType !== 'J'">
                <dm-form-cpf v-model="formFields.cpf"
                             fa-icon="fa fa-id-card-o"
                             @input="$v.formFields['cpf'].$touch()"
                             :vuelidate="$v.formFields['cpf']"
                             label="CPF *"
                             placeholder="Número do CPF"></dm-form-cpf>
              </div>
              <div class="column is-5" v-if="formFields.entityType === 'J'">
                <dm-form-cnpj v-model="formFields.cnpj"
                             fa-icon="fa fa-id-card-o"
                             @input="$v.formFields['cnpj'].$touch()"
                             :vuelidate="$v.formFields['cnpj']"
                             label="CNPJ *"
                             placeholder="Número do CNPJ"></dm-form-cnpj>
              </div>
              <div class="column">
                <dm-form-boolean v-model="formFields.active"
                                 @click.native="$v.formFields['active'].$touch()"
                                 label="Ativo"></dm-form-boolean>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <span class="required-fields-legend-ast">* </span><span class="required-fields-legend">Campos requeridos.</span>
              </div>
            </div>
          </div>
          <div class="column">
            <dm-form-textarea v-model="formFields.description"
                          @input="$v.formFields['description'].$touch()"
                          :vuelidate="$v.formFields['description']"
                          label="Sobre *"
                          placeholder="Informações sobre o prestador"></dm-form-textarea>
          </div>
        </div>
        <div class="">
          <dm-buttons :save-enabled="enableSaveButton"
                      :cancel-enabled="true"
                      :delete-enabled="enableDeleteButton"
                      @action-save="saveForm"
                      @action-cancel="closeForm"
                      @action-delete="deleteDoc"></dm-buttons>
        </div>
        <div class="is-hidden-tablet dm-divisor">
        </div>
        <div class="abas" v-if="state === 'update'">
          <dm-abas :provider-id="providerId"></dm-abas>
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

import _ from 'lodash'

import Http from '../../../../utils/services/http'

import { showAPIErrors, showAPISuccess, showConfirmDelete } from '../../../../utils/services/messenger/main'

import { mapState } from 'vuex'
import DmBreadcrumbs from '../../../../utils/ui/Breadcrumbs.vue'
import DmFormName from '../../../../utils/ui/form/Name.vue'
import DmFormEmail from '../../../../utils/ui/form/Email.vue'
import DmFormTextarea from '../../../../utils/ui/form/Textarea.vue'
import DmFormRadio from '../../../../utils/ui/form/Radio.vue'
import DmFormCpf from '../../../../utils/ui/form/CPF.vue'
import DmFormCnpj from '../../../../utils/ui/form/CNPJ.vue'
import DmFormBoolean from '../../../../utils/ui/form/Boolean.vue'
import DmButtons from '../../../../utils/ui/form/Buttons.vue'
import DmAbas from './Abas.vue'

export default {
  data () {
    return {
      teste: false,
      formFields: {
        _id: '',
        name: '',
        email: '',
        description: '',
        entityType: '',
        cpf: '',
        cnpj: '',
        active: false
      },
      entityTypeOptions: [
        { label: 'Física', value: 'F' },
        { label: 'Jurídica', value: 'J' }
      ]
    }
  },
  validations: {
    formFields: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      description: {
        required
      },
      entityType: {
        required
      },
      cpf: {
        minLength: minLength(14),
        maxLength: maxLength(14)
      },
      cnpj: {
        minLength: minLength(18),
        maxLength: maxLength(18)
      },
      active: {
      }
    }
  },
  components: {
    DmBreadcrumbs,
    DmFormName,
    DmFormEmail,
    DmFormTextarea,
    DmFormRadio,
    DmFormCpf,
    DmFormCnpj,
    DmFormBoolean,
    DmButtons,
    DmAbas
  },
  mounted () {
    if (this.state !== 'new' && this.state !== 'update') {
      this.closeForm()
    }
    if (this.state === 'update') {
      this.openDoc(this.providerId)
    }
  },
  methods: {
    closeForm () {
      this.$router.push({ name: 'providers' })
    },
    saveForm () {
      this.state === 'new' ? this.newDoc() : this.updateDoc()
    },
    openDoc (providerId) {
      Http.get('/providers/' + providerId)
      .then(response => {
        this.getFormFieldsFromResponse(response.data)
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
        this.closeForm()
      })
    },
    newDoc () {
      Http.post('/providers', this.cloneDataFormFields(this.formFields))
      .then(response => {
        this.$router.push({ name: 'providers.update', params: { state: 'update', providerId: response.data._id } })
        showAPISuccess({ title: 'OK', message: 'Prestador cadastrado com sucesso!' })
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    updateDoc () {
      Http.put('/providers', this.cloneDataFormFields(this.formFields))
      .then(response => {
        showAPISuccess({ title: 'OK', message: 'Prestador alterado com sucesso!' })
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    callbackDeleteDoc () {
      Http.delete('/providers/' + this.providerId)
      .then(response => {
        showAPISuccess({ title: 'OK', message: 'Provider removido com sucesso!' })
        this.closeForm()
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    deleteDoc () {
      showConfirmDelete(this.callbackDeleteDoc)
    },
    cloneDataFormFields (_objData) {
      const _formsFieldsCloned = _.cloneDeep(this.formFields)

      if (this.state === 'new') {
        _formsFieldsCloned.createdById = this.session._id
      } else {
        _formsFieldsCloned.updatedById = this.session._id
        _formsFieldsCloned._id = this.providerId
      }

      _formsFieldsCloned.entityType === 'F' ? delete _formsFieldsCloned.cnpj : delete _formsFieldsCloned.cpf

      return _formsFieldsCloned
    },
    getFormFieldsFromResponse (responseObj) {
      const _cloned = _.cloneDeep(responseObj)
      this.formFields._id = _cloned._id
      this.formFields.name = _cloned.name
      this.formFields.email = _cloned.email
      this.formFields.description = _cloned.description
      this.formFields.entityType = _cloned.entityType
      this.formFields.cpf = _cloned.cpf !== undefined ? _cloned.cpf : ''
      this.formFields.cnpj = _cloned.cnpj !== undefined ? _cloned.cnpj : ''
      this.formFields.active = _cloned.active
      this.$v.formFields.$touch()
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
    enableDeleteButton () {
      return this.state === 'update'
    },
    enableSaveButton () {
      if (_.filter(this.$v.formFields, e => e.$invalid).length > 0) return false

      if (this.formFields.entityType === 'F') {
        if (this.formFields.cpf === '') return false
        if (this.$v.formFields.cpf.$invalid) return false
      }
      if (this.formFields.entityType === 'J') {
        if (this.formFields.cnpj === '') return false
        if (this.$v.formFields.cnpj.$invalid) return false
      }
      return true
    },
    providerId () {
      return this.$route.params.providerId !== undefined ? this.$route.params.providerId : ''
    },
    state () {
      return this.$route.params.state !== undefined ? this.$route.params.state : ''
    }
  },
  watch: {
    '$route.params.state' (val, oldVal) {
      if (val !== 'new' && val !== 'update') {
        this.closeForm()
      }
    }
    // 'formFields.entityType' (val) {
    //   val === 'F' ? this.formFields.cnpj = '' : this.formFields.cpf = ''
    // }
  }
}
</script>

<style lang="css" scoped>
  .main-canvas {
    min-height: 900px;
  }
</style>
