<template>
  <section class="hero is-fullheight is-primary is-bold">

    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-4 is-offset-4">
            <h1 class="title">
              Acesso ao DocMob
            </h1>
            <div class="box">
              <div class="columns is-multiline">
                <div class="column">
                  <dm-form-email v-model="formFields.email"
                                @input="$v.formFields.email.$touch()"
                                :vuelidate="$v.formFields.email"
                                label="E-mail"
                                :disabled="isLoading"
                                :autofocus="true"
                                @keyup.enter.native="loginAction()"
                                placeholder="Informe seu e-mail"></dm-form-email>
                </div>
              </div>
              <div class="columns is-multiline">
                <div class="column">
                  <dm-form-password v-model="formFields.password"
                                @input="$v.formFields.password.$touch()"
                                :vuelidate="$v.formFields.password"
                                label="Senha"
                                :disabled="isLoading"
                                @keyup.enter.native="loginAction()"
                                placeholder="********"></dm-form-password>
                </div>
              </div>
              <hr>
              <a :class="{ 'button': true, 'is-primary': true, 'is-disabled': isInvalidLogin, 'is-loading': isLoading }" @click="loginAction()">
                <span class="icon">
                  <i class="fa fa-sign-in"></i>
                </span>
                <span>Login</span>
              </a>
              <a class="button is-default cancelButton" @click="cancelAction()">
                <span class="icon">
                  <i class="fa fa-ban"></i>
                </span>
                <span>Cancelar</span>
              </a>
            </div>
            <p class="has-text-centered">
              <a href="register.html">Criar uma conta</a>
              |
              <a href="#">Recuperar senha</a>
              |
                <a href="#">Precisa de ajuda?</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>

</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import { required, email, minLength } from 'vuelidate/lib/validators'
import { DmFormEmail, DmFormPassword } from '../../utils/ui/form/main'
import { authorization } from '../../utils/services/auth/auth'
import _ from 'lodash'
import { showWarning, showAPIErrors } from '../../utils/services/messenger/main'

export default {
  name: 'DmLogin',
  data () {
    return {
      isLoading: false,
      formFields: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    formFields: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  components: {
    DmFormEmail,
    DmFormPassword
  },
  beforeCreate () {
    if (_.isEmpty(this.accessToken) === false) this.$router.push({ path: '/' })
  },
  mounted () {
    console.log('mounted do login')
    this.masterLoadingStop()
  },
  methods: {
    loginAction () {
      if (this.$v.$invalid) return false
      this.isLoading = true
      console.log('botao login')
      authorization(this.formFields.email, this.formFields.password, (accessToken, payload) => {
        console.log('dentro do callback enviado')
        if (_.isEmpty(accessToken) || _.isEmpty(payload)) {
          showWarning({ title: 'Erro', message: 'Não foi possível acessar o sistema com os dados informados. Por favor, revise seu email e senha!', position: 'topCenter' })
        } else if (_.isEmpty(payload.workplaces) && (payload.admin === false)) {
          showWarning({ title: 'Erro', message: 'Não há nenhum local de trabalho relacionado ao usuário!', position: 'topCenter' })
        } else {
          this.updateUserSession(payload)
          this.updateTokenSession(accessToken)
          console.log('vai autenticar...')
          this.$router.push({ path: '/' })
        }
        this.isLoading = false
      }, (error) => {
        console.log('dentro da callbackErrors', error.config, error.response, error)
        if (error.response === undefined) {
          showAPIErrors(error.response)
        } else {
          showWarning({ title: 'Erro', message: 'Não foi possível acessar o sistema com os dados informados. Por favor, revise seu email e senha!', position: 'topCenter' })
        }
        this.isLoading = false
      })
    },
    cancelAction () {
      console.log('botao cancelar')
      this.formFields.email = ''
      this.formFields.password = ''
      this.$v.formFields.$reset()
    },
    ...mapActions([
      'updateUserSession',
      'updateTokenSession',
      'masterLoadingStop'
    ])
  },
  computed: {
    ...mapState([
      'session',
      'accessToken'
    ]),
    isInvalidLogin () {
      return this.$v.formFields.$invalid
    }
  },
  directives: {
  },
  watch: {
    'formFields.email' (val) {
      this.formFields.email = val.toLowerCase()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../scss/config';

  .cancelButton {
    color: rgb(64, 64, 64) !important;
  }

</style>
