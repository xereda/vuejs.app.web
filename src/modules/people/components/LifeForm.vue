<template lang="html">
<transition name="fade">
  <div class="box">
    <h1 class="title">Vida</h1>
    <h2 class="subtitle" v-if="state === 'new'">Adicionando uma nova vida</h2>
    <h2 class="subtitle" v-else>Alterando uma vida</h2>
    <div class="columns is-multiline">
      <div class="column is-7">
        <div class="columns is-multiline">
          <div class="column is-12">
            <dm-form-name v-model="formFields.name"
                          @input="$v.formFields['name'].$touch()"
                          :vuelidate="$v.formFields['name']"
                          fa-icon="fa fa-heart"
                          label="Nome"
                          placeholder="Informe o nome"></dm-form-name>
          </div>
          <div class="column is-6">
            <dm-form-name v-model="formFields.shortName"
                          @input="$v.formFields['shortName'].$touch()"
                          :vuelidate="$v.formFields['shortName']"
                          fa-icon="fa fa-minus"
                          label="Apelido"
                          placeholder="Nome abreviado"></dm-form-name>
          </div>
          <div class="column is-6">
            <dm-form-cpf v-model="formFields.cpf"
                         fa-icon="fa fa-id-card-o"
                         @input="$v.formFields['cpf'].$touch()"
                         :vuelidate="$v.formFields['cpf']"
                         label="CPF"
                         placeholder="Número do CPF"></dm-form-cpf>
          </div>
          <div class="column is-12">
            <dm-form-name v-model="formFields.mothersName"
                          @input="$v.formFields['mothersName'].$touch()"
                          :vuelidate="$v.formFields['mothersName']"
                          fa-icon="fa fa-female"
                          label="Nome da mãe"
                          placeholder="Nome da mãe"></dm-form-name>
          </div>
          <div class="column is-6">
            <dm-form-date v-model="formFields.birthday"
                          fa-icon="fa fa-birthday-cake"
                          :readonly="false"
                          @input="$v.formFields['birthday'].$touch()"
                          format="Y-m-d"
                          input-format="d/m/Y"
                          :max-date="new Date()"
                          :clear="clearDate"
                          label="Data de Nascimento"
                          placeholder="Nascido em"></dm-form-date>
          </div>
          <div class="column is-6">
            <dm-form-boolean v-model="formFields.active"
                             @click.native="$v.formFields['active'].$touch()"
                             label="Ativo"></dm-form-boolean>
          </div>
          <div class="column is-12">
            <div class="level">
              <div class="control is-grouped is-hidden-mobile">
                <p class="control">
                  <a :class="{ 'button': true, 'is-info': true, 'is-disabled': formIsInvalid }" @click="lifeSave()">
                    <span class="icon is-small">
                      <i class="fa fa-check"></i>
                    </span>
                    <span>Salvar</span>
                  </a>
                </p>
                <p class="control">
                  <a class="button" @click="$emit('close-form')">
                    <span class="icon is-small">
                      <i class="fa fa-ban"></i>
                    </span>
                    <span>Cancelar</span>
                  </a>
                </p>
                <p class="control">
                  <a class="button is-danger" @click="lifeDelete()">
                    <span class="icon is-small">
                      <i class="fa fa-trash"></i>
                    </span>
                    <span>Excluir</span>
                  </a>
                </p>
              </div>
              <div class="control is-grouped is-hidden-tablet">
                <p class="control">
                  <a :class="{ 'button': true, 'is-info': true, 'is-disabled': formIsInvalid }" @click="lifeSave()">
                    <span class="icon is-small">
                      <i class="fa fa-check"></i>
                    </span>
                  </a>
                </p>
                <p class="control">
                  <a class="button" @click="$emit('close-form')">
                    <span class="icon is-small">
                      <i class="fa fa-ban"></i>
                    </span>
                  </a>
                </p>
                <p class="control">
                  <a class="button is-danger" @click="lifeDelete()">
                    <span class="icon is-small">
                      <i class="fa fa-trash"></i>
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-5">
        <dm-life-hi :person-id="personId" :life-id-update="lifeIdUpdate" :state="state"></dm-life-hi>
      </div>
    </div>

    <!-- <pre>{{ formFields }}</pre>
    <pre>{{ $v.formFields }}</pre> -->

  </div>
</transition>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

import _ from 'lodash'
import { mapState } from 'vuex'
import Http from '../../../utils/services/http'
import { showAPISuccess, showAPIErrors } from '../../../utils/services/messenger/main'

import dmFormName from '../../../utils/ui/form/Name.vue'
import dmFormCpf from '../../../utils/ui/form/CPF.vue'
import dmFormDate from '../../../utils/ui/form/Date.vue'
import dmFormBoolean from '../../../utils/ui/form/Boolean.vue'

import dmLifeHi from './LifeAgreements.vue'

export default {
  data () {
    return {
      clearDate: false,
      formFields: {
        _id: '',
        person: this.personId,
        name: '',
        shortName: '',
        cpf: '',
        birthday: '',
        mothersName: '',
        active: false
      }
    }
  },
  validations: {
    formFields: {
      name: {
        required,
        minLength: minLength(3)
      },
      shortName: {
        required,
        minLength: minLength(3)
      },
      cpf: {
        minLength: minLength(14),
        maxLength: maxLength(14)
      },
      birthday: {
        required
      },
      mothersName: {
        required,
        minLength: minLength(3)
      },
      active: {
        required
      }
    }
  },
  methods: {
    lifeGet () {
      const _uri = '/lives/' + this.lifeIdUpdate + '/?_fields=person,name,shortName,cpf,birthday,mothersName,active'
      console.log(_uri)
      Http.get(_uri)
      .then((response) => {
        this.formFields = _.cloneDeep(response.data)
        if (this.formFields.cpf === undefined) this.formFields.cpf = ''
        if (this.formFields.birthday === undefined) this.formFields.birthday = ''
        // this.$v.formFields.$touch()
      })
      .catch((error) => {
        showAPIErrors(error.response)
      })
    },
    lifeSave () {
      if (this.state === 'new') {
        this.formFields.updatedById !== undefined ? delete this.formFields.updatedById : null
        this.formFields.createdById = this.session._id
        this.lifeCreate()
      } else {
        this.formFields.createdById !== undefined ? delete this.formFields.createdById : null
        this.formFields.updatedById = this.session._id
        this.lifeUpdate()
      }
    },
    lifeCreate () {
      Http.post('/lives', this.formFields)
      .then((response) => {
        showAPISuccess({ title: 'OK', message: 'Vida cadastrada com sucesso!' })
        // this.clearFields(true)
        console.log('vai atualizar o status para update: ', response, response.data, response.data._id)
        this.$emit('after-new-life', response.data._id)
      })
      .catch((error) => {
        showAPIErrors(error.response)
      })
    },
    lifeUpdate () {
      Http.put('/lives', this.formFields)
      .then((response) => {
        showAPISuccess({ title: 'OK', message: 'Vida atualizada com sucesso!' })
        this.$emit('close-form')
      })
      .catch((error) => {
        showAPIErrors(error.response)
      })
    },
    lifeDelete () {
      this.$emit('delete-life', this.lifeIdUpdate)
    },
    clearFields (closeForm) {
      this.formFields.name = ''
      this.formFields.shortName = ''
      this.formFields.cpf = ''
      this.formFields.birthday = ''
      this.formFields.mothersName = ''
      this.formFields.active = false
      this.clearDate = true
      this.$v.formFields.$reset()
      if (closeForm === true) {
        this.$emit('close-form')
      }
    }
  },
  components: {
    dmFormName,
    dmFormCpf,
    dmFormDate,
    dmFormBoolean,
    dmLifeHi
  },
  computed: {
    ...mapState({
      config: state => {
        const { config } = state
        return config
      },
      session: state => {
        const { user } = state
        return user
      }
    }),
    formIsInvalid () {
      return this.$v.formFields.$invalid ||
      (!this.$v.formFields['name'].$dirty &&
      !this.$v.formFields['shortName'].$dirty &&
      !this.$v.formFields['cpf'].$dirty &&
      !this.$v.formFields['mothersName'].$dirty &&
      !this.$v.formFields['birthday'].$dirty &&
      !this.$v.formFields['active'].$dirty)
    }
  },
  watch: {
    lifeIdUpdate (val) {
      if (val !== '') {
        this.lifeGet()
      } else {
        this.clearFields(false)
      }
    }
  },
  props: {
    state: {
      type: String,
      default: 'list'
    },
    personId: {
      type: String
    },
    lifeIdUpdate: {
      type: String
    }
  }
}
</script>

<style lang="css">
</style>
