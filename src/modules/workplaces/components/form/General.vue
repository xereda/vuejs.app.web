<template lang="html">
  <transition name="fade">
    <div class="main-canvas">
      <dm-breadcrumbs :object-links="breadcrumbs" :state="state"></dm-breadcrumbs>

      <div class="container box">
        <p class="title is-4">Dados Gerais</p>
        <pre>{{ formFields }}</pre>
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
              <div class="column">
                <dm-form-boolean v-model="formFields.active"
                                 @click.native="$v.formFields['active'].$touch()"
                                 label="Ativo"></dm-form-boolean>
              </div>
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
          <dm-abas :workplace-id="workplaceId"></dm-abas>
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

import _ from 'lodash'

import Http from '../../../services/http'

import { showAPIErrors, showAPISuccess, showConfirmDelete } from '../../../services/messenger/main'

import { mapState } from 'vuex'
import DmBreadcrumbs from '../../../ui/Breadcrumbs.vue'
import DmFormName from '../../../ui/form/Name.vue'
import DmFormEmail from '../../../ui/form/Email.vue'
import DmFormTextarea from '../../../ui/form/Textarea.vue'
import DmFormBoolean from '../../../ui/form/Boolean.vue'
import DmButtons from '../../../ui/form/Buttons.vue'
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
        active: false,
        address: {
          name: '',
          number: '',
          complement: '',
          zipCode: ''
        },
        city: {
          _id: '',
          name: ''
        },
        geoLocation: {
          coordinates: [],
          Type: 'Point'
        },
        phone: '',
        deadLineUserChoose: '',
        nationalCode: ''
      }
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
      active: {
      },
      address: {
        name: {
          required
        },
        neighborhood: {
          required
        },
        zipCode: {
          required
        }
      },
      city: {
        name: {
          required
        }
      },
      phone: {
        required
      }
    }
  },
  components: {
    DmBreadcrumbs,
    DmFormName,
    DmFormEmail,
    DmFormTextarea,
    DmFormBoolean,
    DmButtons,
    DmAbas
  },
  mounted () {
    if (this.state !== 'new' && this.state !== 'update') {
      this.closeForm()
    }
    if (this.state === 'update') {
      this.openDoc(this.workplaceId)
    }
  },
  methods: {
    closeForm () {
      this.$router.push({ name: 'workplaces' })
    },
    saveForm () {
      console.log('entrou da saveForm()')
      this.state === 'new' ? this.newDoc() : this.updateDoc()
    },
    openDoc (workplaceId) {
      Http.get('/workplaces/' + workplaceId + '/?_populate=city')
      .then(response => {
        console.log('response', response, response.data)
        this.getFormFieldsFromResponse(response.data)
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
        this.closeForm()
      })
    },
    newDoc () {
      Http.post('/workplaces', this.cloneDataFormFields(this.formFields))
      .then(response => {
        console.log('response', response, response.data)
        this.$router.push({ name: 'workplaces.update', params: { state: 'update', workplaceId: response.data._id } })
        showAPISuccess({ title: 'OK', message: 'Prestador cadastrado com sucesso!' })
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    updateDoc () {
      Http.put('/workplaces', this.cloneDataFormFields(this.formFields))
      .then(response => {
        console.log('response', response, response.data)
        showAPISuccess({ title: 'OK', message: 'Prestador alterado com sucesso!' })
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    callbackDeleteDoc () {
      Http.delete('/workplaces/' + this.workplaceId)
      .then(response => {
        console.log('response', response, response.data)
        showAPISuccess({ title: 'OK', message: 'Provider removido com sucesso!' })
        this.closeForm()
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    deleteDoc () {
      console.log('dentrou da deleteDoc()')
      showConfirmDelete(this.callbackDeleteDoc)
    },
    cloneDataFormFields (_objData) {
      const _formsFieldsCloned = _.cloneDeep(this.formFields)

      if (this.state === 'new') {
        _formsFieldsCloned.createdById = this.session._id
      } else {
        _formsFieldsCloned.updatedById = this.session._id
        _formsFieldsCloned._id = this.workplaceId
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
      this.formFields.active = _cloned.active
      this.formFields.address.name = _cloned.address.name
      this.formFields.address.number = _cloned.address.number
      this.formFields.address.complement = _cloned.address.complement
      this.formFields.address.neighborhood = _cloned.address.neighborhood
      this.formFields.address.zipCode = _cloned.address.zipCode
      this.formFields.city._id = _cloned.city._id
      this.formFields.city.name = _cloned.city.name
      this.formFields.geoLocation.coordinates[0] = _cloned.geoLocation.coordinates[0]
      this.formFields.geoLocation.coordinates[1] = _cloned.geoLocation.coordinates[1]
      this.formFields.geoLocation.type = _cloned.geoLocation.type
      this.formFields.phone = _cloned.phone
      this.formFields.deadLineUserChoose = _cloned.deadLineUserChoose
      this.formFields.nationalCode = _cloned.nationalCode
      this.$v.formFields.$touch()
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
      },
      breadcrumbs: state => {
        const { breadcrumbs } = state.workplaces.general
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
    workplaceId () {
      return this.$route.params.workplaceId !== undefined ? this.$route.params.workplaceId : ''
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
