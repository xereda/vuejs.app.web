<template lang="html">
  <transition name="fade">
    <div class="box">
      <h2 class="subtitle">Convênios</h2>
      <div class="columns is-multiline">
        <div class="column is-12">
          <dm-form-select v-model="formFields.agreement"
                          placeholder="Selecione um convênio"
                          :actives="true"
                          label="convênio"
                          fa-icon="fa fa-credit-card-alt"
                          api-resource="agreements"
                          :disabled="state === 'new'"></dm-form-select>
        </div>
      </div>
      <div class="column is-12">
        <dm-form-input v-model="formFields.code"
                       @input="$v.formFields['code'].$touch()"
                       :vuelidate="$v.formFields['code']"
                       fa-icon="fa fa-keyboard-o"
                       label="Código"
                       :disabled="state === 'new'"
                       placeholder="Selecione um convênio"></dm-form-input>
      </div>
      <div class="column is-12">
        <a @click="agreementAdd()" :class="{ 'button': true, 'is-success': true, 'is-disabled': !addButtonIsActive }">
          <span class="icon is-small">
            <i class="fa fa-check"></i>
          </span>
          <span>Adicionar</span>
        </a>
      </div>
      <div class="column is-12">
        <table class="table" v-show="agreements.length > 0">
          <thead>
            <tr>
              <th class="">Convênio</th>
              <th class="is-hidden-mobile">Código</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agreement in agreementsList">
              <td class="">{{ agreement.name }}</td>
              <td class="is-hidden-mobile">{{ agreement.code }}</td>
              <td class="is-icon">
                <a @click="agreementDelete(agreement.agreement)">
                  <span class="icon">
                    <i class="fa fa-trash"></i>
                  </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

import { showAPISuccess, showAPIErrors } from 'utils/services/messenger/main'
import Http from 'utils/services/http'

import dmFormSelect from 'utils/ui/form/Select.vue'
import dmFormInput from 'utils/ui/form/Input.vue'

export default {
  name: 'dmLifeAgreements',
  data () {
    return {
      agreements: [],
      formFields: {
        agreement: '',
        name: '',
        code: '',
        createdById: ''
      }
    }
  },
  validations: {
    formFields: {
      code: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15)
      }
    }
  },
  mounted () {
  },
  methods: {
    agreementsGet () {
      Http.get('/lives/' + this.lifeIdUpdate + '/agreements')
      .then(response => {
        this.agreements = []
        response.data.forEach((element) => {
          console.log('element: ', element)
          const _obj = { agreement: element.agreement._id, name: element.agreement.shortName, code: element.code }
          console.log('olha como ficou o _obj: ', _obj)
          this.agreements.push(_obj)
        })
        console.log(response)
      })
      .catch(error => {
        console.log('error.response: ', error.response)
        showAPIErrors(error.response)
      })
    },
    agreementAdd () {
      this.formFields.createdById = this.session._id
      const _uri = '/lives/' + this.lifeIdUpdate + '/agreements'
      console.log('_uri do post: ', _uri)
      Http.post(_uri, this.formFields)
      .then(response => {
        console.log(response.status, response)
        showAPISuccess({ title: 'OK', message: 'Convênio relaciomado a vida com sucesso!' })
        this.agreementsGet()
      })
      .catch((error) => {
        console.log('error.response: ', error.response)
        showAPIErrors(error.response)
      })
    },
    agreementDelete (agreementIdDelete) {
      const _uri = '/lives/' + this.lifeIdUpdate + '/agreements/' + agreementIdDelete
      console.log('_uri do delete: ', _uri)
      Http.delete(_uri)
      .then(response => {
        console.log(response.status, response)
        showAPISuccess({ title: 'OK', message: 'Convênio removido com sucesso!' })
        this.agreementsGet()
      })
      .catch((error) => {
        console.log('error.response: ', error.response)
        showAPIErrors(error.response)
      })
    }
  },
  components: {
    dmFormSelect,
    dmFormInput
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
    agreementsList () {
      return this.agreements
    },
    addButtonIsActive () {
      if (this.state !== 'update') return false
      if (this.formFields.agreement === '') return false
      if (this.formFields.code === '') return false
      if (this.$v.formFields['code'].$invalid) return false
      return true
    }
  },
  watch: {
    state (val) {
      if (val === 'update') {
        this.agreementsGet()
      } else {
        this.agreements = []
      }
    }
  },
  props: {
    personId: {
      type: String,
      required: true
    },
    lifeIdUpdate: {
      type: String,
      default: ''
    },
    state: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
