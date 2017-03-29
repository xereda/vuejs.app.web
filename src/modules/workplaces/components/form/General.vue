<template lang="html">
  <transition name="fade">
    <div class="main-canvas">
      <dm-breadcrumbs :object-links="breadcrumbs" :state="state"></dm-breadcrumbs>

      <div class="container box">
        <p class="title is-4">Dados Gerais</p>
        <div class="columns is-multiline" ref="spin">
          <div class="column is-7">
            <div class="columns is-multiline">
              <div class="column is-6">
                <dm-form-name v-model="formFields.name"
                              @input.native="$v.formFields['name'].$touch()"
                              :vuelidate="$v.formFields['name']"
                              fa-icon="fa fa-user-md"
                              label="Nome *"
                              placeholder="Informe o nome"></dm-form-name>
              </div>
              <div class="column is-6">
                <dm-form-email v-model="formFields.email"
                              @input.native="$v.formFields['email'].$touch()"
                              :vuelidate="$v.formFields['email']"
                              fa-icon="fa fa-envelope"
                              label="E-mail *"
                              placeholder="Informe o e-mail"></dm-form-email>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-5">
                <dm-form-phone v-model="formFields.phone"
                              @input.native="$v.formFields['phone'].$touch()"
                              :vuelidate="$v.formFields['phone']"
                              fa-icon="fa fa-phone"
                              label="Telefone *"
                              placeholder="(99) 9999-9999"></dm-form-phone>
              </div>
              <div class="column is-4">
                <dm-form-input v-model="formFields.nationalCode"
                              label="Código nacional"
                              placeholder="Código nacional"></dm-form-input>
              </div>
              <div class="column">
                <dm-form-boolean v-model="formFields.active"
                                 @click.native="$v.formFields['active'].$touch()"
                                 label="Ativo"></dm-form-boolean>
              </div>
            </div>
          </div>
          <div class="column">
            <dm-form-textarea v-model="formFields.description"
                          @input.native="$v.formFields['description'].$touch()"
                          :vuelidate="$v.formFields['description']"
                          label="Sobre *"
                          placeholder="Informações sobre o prestador"></dm-form-textarea>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column">
            <div class="box">
              <h5 class="subtitle is-5">Endereço</h5>
              <div class="">
                <div class="columns is-multiline">
                  <div class="column is-2">
                    <dm-form-cep v-model="formFields.address.zipCode"
                                  @input="$v.formFields.address.zipCode.$touch()"
                                  :vuelidate="$v.formFields.address.zipCode"
                                  @change.native="getCEPData()"
                                  label="CEP *"
                                  placeholder="CEP"></dm-form-cep>
                  </div>
                  <div class="column is-5">
                    <dm-form-name v-model="formFields.address.name"
                                  @input="$v.formFields.address.name.$touch()"
                                  :vuelidate="$v.formFields.address.name"
                                  label="Nome *"
                                  placeholder="Informe o logradouro"></dm-form-name>
                  </div>
                  <div class="column is-2">
                    <dm-form-number v-model="formFields.address.number"
                                    label="Número"
                                    placeholder="Número"
                                    fa-icon="fa fa-dot-circle-o"></dm-form-number>
                  </div>
                  <div class="column is-3">
                    <dm-form-name v-model="formFields.address.neighborhood"
                                  @input="$v.formFields.address.neighborhood.$touch()"
                                  :vuelidate="$v.formFields.address.neighborhood"
                                  label="Bairro *"
                                  placeholder="Bairro"
                                  fa-icon="fa fa-map-signs"></dm-form-name>
                  </div>
                </div>
                <div class="columns is-multiline">
                  <div class="column is-3">
                    <dm-form-input v-model="formFields.address.complement"
                                  label="Complemento"
                                  placeholder="Complemento"></dm-form-input>
                  </div>
                  <div class="column is-3">
                    <dm-form-latitude v-model="formFields.geoField.lat"
                                  @input="$v.formFields.geoField.lat.$touch()"
                                  :vuelidate="$v.formFields.geoField.lat"
                                  label="Lat. *"
                                  placeholder="Latitude"></dm-form-latitude>
                  </div>
                  <div class="column is-3">
                    <dm-form-longitude v-model="formFields.geoField.long"
                                  @input="$v.formFields.geoField.long.$touch()"
                                  :vuelidate="$v.formFields.geoField.long"
                                  label="Long. *"
                                  placeholder="Longitude"></dm-form-longitude>
                  </div>
                  <div class="column">
                    <dm-form-select v-model="formFields.city"
                               api-resource="cities"
                               @input="$v.formFields.city.$touch()"
                               :vuelidate="$v.formFields.city"
                               :actives="true"
                               label="Cidade *"
                             ></dm-form-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="columns is-multiline">
          <div class="column">
            <span class="required-fields-legend-ast">* </span><span class="required-fields-legend">Campos requeridos.</span>
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
import { mapState } from 'vuex'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, email, minLength, maxLength, between } from 'vuelidate/lib/validators'
// import 'izitoast/dist/css/iziToast.css'

import _ from 'lodash'

import Http from 'utils/services/http'

import { showAPIErrors,
         showAPISuccess,
         showWarning,
         showConfirmDelete } from 'utils/services/messenger/main'

import DmBreadcrumbs from 'utils/ui/Breadcrumbs.vue'

import { DmFormName,
         DmFormEmail,
         DmFormTextarea,
         DmFormBoolean,
         DmFormPhone,
         DmFormInput,
         DmFormCep,
         DmFormNumber,
         DmFormLatitude,
         DmFormLongitude,
         DmFormSelect,
         DmButtons } from 'utils/ui/form/main'

import DmAbas from './Abas.vue'

import topbar from 'topbar'
import Spinner from 'spin'
let SPIN = {}

export default {
  data () {
    return {
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
          zipCode: '',
          neighborhood: ''
        },
        city: '',
        geoLocation: {
          coordinates: [
            '',
            ''
          ],
          Type: 'Point'
        },
        geoField: {
          lat: '',
          long: ''
        },
        phone: '',
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
        zipCode: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10)
        },
        neighborhood: {
          required
        }
      },
      city: {
        required
      },
      phone: {
        required
      },
      geoField: {
        lat: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(11),
          between: between(-85, 85)
        },
        long: {
          required,
          minLength: minLength(11),
          maxLength: maxLength(12),
          between: between(-180.0000001, 179.9999999)
        }
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
    DmFormPhone,
    DmFormInput,
    DmAbas,
    DmFormCep,
    DmFormLatitude,
    DmFormLongitude,
    DmFormNumber,
    DmFormSelect
  },
  mounted () {
    topbar.config(this.config.topbar)
    SPIN = new Spinner(this.config.spinner)
    if (this.state !== 'new' && this.state !== 'update') {
      this.closeForm()
    }
    if (this.state === 'update') {
      this.openDoc(this.workplaceId)
    }
  },
  methods: {
    cleanCEPData () {
      this.formFields.address.name = ''
      this.formFields.address.number = ''
      this.formFields.address.complement = ''
      this.formFields.address.neighborhood = ''
      this.formFields.city = ''
      this.formFields.geoLocation.coordinates[0] = ''
      this.formFields.geoLocation.coordinates[1] = ''
      this.formFields.geoField.lat = ''
      this.formFields.geoField.long = ''
    },
    getCEPData () {
      SPIN.spin(this.$refs.spin)
      topbar.show()
      this.cleanCEPData()
      console.log('dentro da get cep data')
      Http.get(this.config.APICEPData + this.formFields.address.zipCode.replace('.', '').replace('-', ''))
      .then(response => {
        console.log(response.data)
        this.formFields.address.name = response.data.logradouro
        this.formFields.address.neighborhood = response.data.bairro
        this.getCityData(response.data.cidade)
        SPIN.stop()
        topbar.hide()
      })
      .catch(error => {
        console.log(error)
        showWarning({ title: 'CEP', message: 'CEP não existe ou inválido!', position: 'bottomLeft' })
        SPIN.stop()
        topbar.hide()
      })
    },
    getCityData (name) {
      if (name === undefined || name === '') return false
      Http.get('cities/?name=' + name.toUpperCase())
      .then(response => {
        console.log(response.data)
        this.formFields.city = response.data[0]._id
      })
      .catch(error => {
        console.log(error)
        // showWarning({ title: 'CEP', message: 'CEP não existe ou inválido!' })
      })
    },
    closeForm () {
      this.$router.push({ name: 'workplaces' })
    },
    saveForm () {
      console.log('entrou na saveForm()')
      this.state === 'new' ? this.newDoc() : this.updateDoc()
    },
    openDoc (workplaceId) {
      SPIN.spin(this.$refs.spin)
      topbar.show()
      Http.get('/workplaces/' + workplaceId + '/?_populate=city')
      .then(response => {
        console.log('response', response, response.data)
        this.hydrateDataForm(response.data)
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
        this.closeForm()
        SPIN.stop()
        topbar.hide()
      })
    },
    newDoc () {
      SPIN.spin(this.$refs.spin)
      topbar.show()
      Http.post('/workplaces', this.cloneDataFormFields(this.formFields))
      .then(response => {
        console.log('response', response, response.data)
        this.$router.push({ name: 'workplaces.update', params: { state: 'update', workplaceId: response.data._id } })
        showAPISuccess({ title: 'OK', message: 'Local de atendimento cadastrado com sucesso!' })
        SPIN.stop()
        topbar.hide()
      })
      .catch(error => {
        console.log(error.response)
        showAPIErrors(error.response)
        SPIN.stop()
        topbar.hide()
      })
    },
    updateDoc () {
      SPIN.spin(this.$refs.spin)
      topbar.show()
      Http.put('/workplaces', this.cloneDataFormFields(this.formFields))
      .then(response => {
        SPIN.stop()
        topbar.hide()
        console.log('response', response, response.data)
        showAPISuccess({ title: 'OK', message: 'Local de atendimento alterado com sucesso!' })
      })
      .catch(error => {
        SPIN.stop()
        topbar.hide()
        console.log(error.response)
        showAPIErrors(error.response)
      })
    },
    callbackDeleteDoc () {
      Http.delete('/workplaces/' + this.workplaceId)
      .then(response => {
        console.log('response', response, response.data)
        showAPISuccess({ title: 'OK', message: 'Local de atendimento removido com sucesso!' })
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

      _formsFieldsCloned.geoLocation.coordinates[0] = _formsFieldsCloned.geoField.long
      _formsFieldsCloned.geoLocation.coordinates[1] = _formsFieldsCloned.geoField.lat
      delete _formsFieldsCloned.geoField

      _formsFieldsCloned.phone = _formsFieldsCloned.phone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')
      _formsFieldsCloned.address.zipCode = _formsFieldsCloned.address.zipCode.replace('.', '').replace('-', '')

      return _formsFieldsCloned
    },
    hydrateDataForm (responseObj) {
      const _cloned = _.cloneDeep(responseObj)
      this.formFields._id = _cloned._id
      this.formFields.name = _cloned.name
      this.formFields.email = _cloned.email
      this.formFields.description = _cloned.description
      this.formFields.active = _cloned.active
      this.formFields.address.name = _cloned.address.name
      this.formFields.address.number = _cloned.address.number.toString()
      this.formFields.address.complement = _cloned.address.complement
      this.formFields.address.neighborhood = _cloned.address.neighborhood
      this.formFields.address.zipCode = _cloned.address.zipCode.toString()
      this.formFields.city = _cloned.city._id
      this.formFields.geoLocation.coordinates[0] = _cloned.geoLocation.coordinates[0]
      this.formFields.geoLocation.coordinates[1] = _cloned.geoLocation.coordinates[1]
      this.formFields.geoLocation.type = _cloned.geoLocation.type
      this.formFields.geoField.lat = _cloned.geoLocation.coordinates[1].toString()
      this.formFields.geoField.long = _cloned.geoLocation.coordinates[0].toString()
      this.formFields.phone = _cloned.phone.toString()
      this.formFields.nationalCode = _cloned.nationalCode
      setTimeout(() => {
        this.$v.formFields.$touch()
        SPIN.stop()
        topbar.hide()
      }, 200)
      console.log(this.formFields)
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
    // 'formFields.address.zipCode' (val) {
    //   console.log('dentro do watch do cep', val)
    // }
  }
}
</script>

<style lang="scss">
  @import '~izitoast/dist/css/iziToast.css';
  .main-canvas {
    min-height: 900px;
  }
</style>
